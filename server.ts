import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Explicitly serve static assets from public/ directory
app.use(express.static(path.join(process.cwd(), "public")));

// Endpoint to save updated photo directly to static server paths
app.post("/api/save-photo", (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: "No image provided" });
    }
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    // Write to public/jayed.jpg
    const publicPath = path.join(process.cwd(), "public", "jayed.jpg");
    fs.writeFileSync(publicPath, buffer);

    // Also write to src/assets/jayed.jpg
    const srcAssetPath = path.join(process.cwd(), "src", "assets", "jayed.jpg");
    if (fs.existsSync(path.dirname(srcAssetPath))) {
      fs.writeFileSync(srcAssetPath, buffer);
    }

    // Also write to dist/jayed.jpg if dist exists
    const distPath = path.join(process.cwd(), "dist", "jayed.jpg");
    if (fs.existsSync(path.join(process.cwd(), "dist"))) {
      fs.writeFileSync(distPath, buffer);
    }

    res.json({ success: true, url: "/jayed.jpg?t=" + Date.now() });
  } catch (err: any) {
    console.error("Save photo error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API endpoint for generating tailored portfolio conversion copy & UX layouts
app.post("/api/generate-portfolio-copy", async (req, res) => {
  try {
    const {
      name = "MD Jayed",
      title = "CSE Student at Islamic University (IU) • Cybersecurity & Ethical Hacking • AI Web Developer",
      experience = "CSE Student at Islamic University, Bangladesh (IU) | Cybersecurity & Ethical Hacker",
      skills = "Ethical Hacking, OWASP Top 10, Nmap, Burp Suite, Python, React 19, TypeScript, Node.js, Gemini AI API",
      projects = "Engineered AI-powered Web Vulnerability Scanner, Cryptographic Auth System, and IU Student Resource Hub.",
      targetAudience = "Tech Startups, Security Teams, Academic Collaborators, Global Clients",
      tone = "Confident, technically rigorous, ethical, and solution-driven",
    } = req.body;

    const systemPrompt = `You are a world-class conversion copywriter and lead UX/UI designer specializing in high-converting personal portfolios.
Your goal is to generate persuasive, benefit-driven, modern portfolio copy and structured UX layout advice tailored to the user's profile.

Rules:
1. Tone: ${tone}.
2. Ensure copy highlights real business value, quantifiable metrics, problem-solving mastery, and frictionless calls to action.
3. Return valid JSON matching the exact schema requested.`;

    const userPrompt = `Generate a complete high-converting portfolio copy suite and UX layout guide for:
- Name: ${name}
- Professional Title: ${title}
- Experience: ${experience}
- Core Skills: ${skills}
- Major Projects/Achievements: ${projects}
- Target Audience: ${targetAudience}

Include all 7 required sections:
1. Hero Section (Headline, Sub-headline, CTAs, Trust badge, Value proposition)
2. About Me Section (2 compelling bio paragraphs, 4 key stats/facts, Approach highlights)
3. Core Skills & Expertise Section (Categorized technical and soft skills with context and impact)
4. Featured Projects Section (3 detailed project cards with title, category, description, tools, and quantifiable results/impact)
5. Services Offered (3-4 distinct offerings with title, 2-sentence value prop, deliverables, and target outcome)
6. Testimonials / Social Proof Placeholder (Intro text, 3 realistic client quotes with names, roles, company archetypes, and ratings)
7. Contact Me Section (Persuasive closing hook, response time guarantee, contact fields layout guide, social links)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hero: {
              type: Type.OBJECT,
              properties: {
                badge: { type: Type.STRING, description: "Small availability badge or trust pill" },
                headline: { type: Type.STRING, description: "Bold attention-grabbing headline" },
                subheadline: { type: Type.STRING, description: "Concise 2-sentence sub-headline" },
                primaryCta: { type: Type.STRING, description: "Primary action button text" },
                secondaryCta: { type: Type.STRING, description: "Secondary action button text" },
                uxLayoutNote: { type: Type.STRING, description: "UX designer advice for hero layout" },
              },
              required: ["badge", "headline", "subheadline", "primaryCta", "secondaryCta", "uxLayoutNote"],
            },
            about: {
              type: Type.OBJECT,
              properties: {
                bioParagraph1: { type: Type.STRING, description: "First bio paragraph focusing on passion & expertise" },
                bioParagraph2: { type: Type.STRING, description: "Second bio paragraph focusing on problem-solving & client collaboration" },
                stats: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      value: { type: Type.STRING },
                      label: { type: Type.STRING },
                      subtext: { type: Type.STRING },
                    },
                    required: ["value", "label", "subtext"],
                  },
                },
                uxLayoutNote: { type: Type.STRING, description: "UX designer layout guidance for About section" },
              },
              required: ["bioParagraph1", "bioParagraph2", "stats", "uxLayoutNote"],
            },
            skills: {
              type: Type.OBJECT,
              properties: {
                intro: { type: Type.STRING, description: "Section headline or brief context" },
                categories: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      categoryName: { type: Type.STRING },
                      description: { type: Type.STRING },
                      skillsList: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            name: { type: Type.STRING },
                            level: { type: Type.STRING },
                            context: { type: Type.STRING },
                          },
                          required: ["name", "level", "context"],
                        },
                      },
                    },
                    required: ["categoryName", "description", "skillsList"],
                  },
                },
                uxLayoutNote: { type: Type.STRING },
              },
              required: ["intro", "categories", "uxLayoutNote"],
            },
            projects: {
              type: Type.OBJECT,
              properties: {
                intro: { type: Type.STRING },
                projectList: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      category: { type: Type.STRING },
                      tagline: { type: Type.STRING },
                      description: { type: Type.STRING },
                      tools: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      impact: { type: Type.STRING },
                      liveDemoUrl: { type: Type.STRING },
                      githubUrl: { type: Type.STRING },
                    },
                    required: ["id", "title", "category", "tagline", "description", "tools", "impact"],
                  },
                },
                uxLayoutNote: { type: Type.STRING },
              },
              required: ["intro", "projectList", "uxLayoutNote"],
            },
            services: {
              type: Type.OBJECT,
              properties: {
                intro: { type: Type.STRING },
                serviceList: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      valueProposition: { type: Type.STRING, description: "2-sentence value proposition" },
                      deliverables: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      idealFor: { type: Type.STRING },
                    },
                    required: ["title", "valueProposition", "deliverables", "idealFor"],
                  },
                },
                uxLayoutNote: { type: Type.STRING },
              },
              required: ["intro", "serviceList", "uxLayoutNote"],
            },
            testimonials: {
              type: Type.OBJECT,
              properties: {
                intro: { type: Type.STRING, description: "Introduction inviting feedback or displaying quotes" },
                quotes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      quote: { type: Type.STRING },
                      author: { type: Type.STRING },
                      role: { type: Type.STRING },
                      company: { type: Type.STRING },
                      rating: { type: Type.NUMBER },
                      projectContext: { type: Type.STRING },
                    },
                    required: ["quote", "author", "role", "company", "rating"],
                  },
                },
                uxLayoutNote: { type: Type.STRING },
              },
              required: ["intro", "quotes", "uxLayoutNote"],
            },
            contact: {
              type: Type.OBJECT,
              properties: {
                closingStatement: { type: Type.STRING, description: "Persuasive closing hook encouraging outreach" },
                availabilityStatus: { type: Type.STRING },
                responseTime: { type: Type.STRING },
                formFieldsGuide: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      field: { type: Type.STRING },
                      purpose: { type: Type.STRING },
                      placeholder: { type: Type.STRING },
                    },
                    required: ["field", "purpose", "placeholder"],
                  },
                },
                directEmail: { type: Type.STRING },
                uxLayoutNote: { type: Type.STRING },
              },
              required: ["closingStatement", "availabilityStatus", "responseTime", "formFieldsGuide", "uxLayoutNote"],
            },
            conversionStrategy: {
              type: Type.OBJECT,
              properties: {
                targetPersona: { type: Type.STRING },
                primaryConversionGoal: { type: Type.STRING },
                uxDesignHighlights: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["targetPersona", "primaryConversionGoal", "uxDesignHighlights"],
            },
          },
          required: ["hero", "about", "skills", "projects", "services", "testimonials", "contact", "conversionStrategy"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Error generating portfolio copy:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate portfolio copy",
    });
  }
});

// Start Server & mount Vite in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
