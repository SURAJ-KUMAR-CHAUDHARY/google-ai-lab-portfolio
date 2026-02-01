link -  https://suraj-kumar-chaudhary.github.io/google-ai-lab-portfolio/
# Interactive Portfolio Website

A modern, responsive portfolio website generated from a PDF profile.

## Features
- **Profile Data**: Automatically loaded from `profile.json`.
- **Theme**: Dark/Light mode toggle (persisted).
- **Animations**: Scroll-reveal and smooth gradient effects.
- **Contact**: Integrated Google Form support.

## Configuration
### Google Form
To enable the contact form:
1. Create a Google Form.
2. Get the shareable link (e.g., `https://docs.google.com/forms/d/e/.../viewform`).
3. Open `script.js`.
4. Replace `PASTE_GOOGLE_FORM_LINK_HERE` with your URL.

### Profile Data
Edit `profile.json` to update your details, skills, experience, and projects.

## Running Locally
You need a local server to handle JSON fetching (CORS).

### Option 1: Python (Recommended)
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000)

### Option 2: Live Server (VS Code)
Install the Live Server extension and click "Go Live".
