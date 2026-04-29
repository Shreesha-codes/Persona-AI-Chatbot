# Persona-Based AI Chatbot

A working persona-based AI chatbot built for Prompt Engineering | Scaler Academy.

## Live Deployment
**Live Link:** [https://persona-ai-chatbot-bcm6.vercel.app](https://persona-ai-chatbot-bcm6.vercel.app?_vercel_share=UyI4XuymjFfgYtzV6BdjBilituo1rUbP)

## Overview
This application allows users to have real conversations with three distinct Scaler/InterviewBit personalities:
- **Anshuman Singh** (Mentor, deep learning focus, first-principles)
- **Kshitij Mishra** (Classroom instructor, pedagogical step-by-step approach)
- **Abhimanyu Saxena** (Founder, reflective, storytelling, map vs. compass)

## Tech Stack
- Frontend: React + Vite
- Styling: Vanilla CSS (Dark/Premium theme)
- Icons: Lucide React
- Markdown: react-markdown
- API: Google Gemini API (gemini-2.5-flash)

## Features
- Interactive chat interface with three distinct personas
- Real-time persona switching (resets conversation context)
- Active persona clearly visible with avatars and descriptions
- Custom tailored suggestion chips per persona
- Typing indicators during API calls
- Graceful error handling
- Fully responsive on mobile and desktop
- Advanced prompt engineering (Few-shot, CoT, Constraints)

## Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone <repo-url>
   cd Persona-AI-Chatbot
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Environment Variables:**
   - Copy the example `.env` file:
     \`\`\`bash
     cp .env.example .env
     \`\`\`
   - Open `.env` and add your Google Gemini API key:
     \`\`\`env
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Deploying to Vercel (Required for Assignment):**
   - Install Vercel CLI: \`npm install -g vercel\`
   - Run \`vercel\` and follow the prompts.
   - When asked to link to an existing project, select 'N'.
   - Add your \`VITE_GEMINI_API_KEY\` to the Vercel dashboard environment variables.
   - After deployment, copy the URL and place it in the "Live Link" section at the top of this README.

## Repository Documentation
- \`prompts.md\`: Contains all three system prompts with detailed inline comments explaining product decisions.
- \`reflection.md\`: A 300-500 word reflection on the process, GIGO principle, and potential improvements.
