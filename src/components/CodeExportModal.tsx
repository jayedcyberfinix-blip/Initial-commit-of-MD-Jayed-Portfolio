import React from 'react';
import { X, Github, Rocket } from 'lucide-react';
import { PortfolioData } from '../types';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const githubDeployScript = `# ========================================================
# 🚀 1-Click Deploy to GitHub Pages: MD Jayed Portfolio
# ========================================================

# Step 1: Initialize Git and stage your files
git init
git add .
git commit -m "feat: launch MD Jayed portfolio with GitHub Pages setup"

# Step 2: Set your main branch
git branch -M main

# Step 3: Add your remote GitHub repository
# Replace <your-repo-name> with your repository name (e.g. portfolio)
git remote add origin https://github.com/jayedcyberfinix-blip/<your-repo-name>.git

# Step 4: Push code to GitHub
git push -u origin main

# ========================================================
# Step 5: Enable GitHub Pages in your GitHub Repo:
# 1. Open your repo on GitHub: https://github.com/jayedcyberfinix-blip/<your-repo-name>
# 2. Click on "Settings" (top tab) -> "Pages" (left sidebar)
# 3. Under "Build and deployment" > "Source", select: "GitHub Actions"
# 4. That's it! GitHub will automatically trigger .github/workflows/deploy.yml
#    and your portfolio will be live at:
#    https://jayedcyberfinix-blip.github.io/<your-repo-name>/
# ========================================================

# ALTERNATIVE METHOD: Deploy with 1 command via npm
# npm run deploy
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                GitHub Pages Deploy Guide
              </h3>
              <p className="text-xs text-slate-400">
                Instructions to deploy and publish your portfolio to GitHub Pages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 border-b border-slate-800 flex items-center gap-4 text-xs font-bold bg-slate-900">
          <div className="pb-3 border-b-2 border-sky-400 text-sky-400 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5" />
            GitHub Pages Deploy
          </div>
        </div>

        {/* Code View Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950">
          <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <code>{githubDeployScript}</code>
          </pre>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
