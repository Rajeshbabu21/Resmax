# Resumax

Resumax is an AI-powered resume builder, ATS analyzer, and cover letter/email draft generator designed to help you land your dream job with highly optimized application materials.

## Features
- **AI Resume Builder**: Build an aesthetic, highly structured resume with dynamic adding, editing, and deleting of Experience, Education, Projects, and Skills. Includes classic and modern templates with live preview.
- **ATS Analysis**: Upload an existing resume to get an AI-powered score based on Content Quality, ATS Structure, Job Optimization, and Writing Quality, along with actionable feedback on missing keywords.
- **Cover Letter & Email Generator**: Enter a target job description and select your saved resume to automatically generate highly tailored, professional cover letters and email drafts using Google Gemini AI.
- **Save & Export**: Save your resumes securely to your account or export them directly to PDF using a clean print-ready layout.

---

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS (Neo-Brutalism design system), React Router
- **Backend**: FastAPI, Python, PyJWT (Authentication)
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Google Gemini 2.5 Flash (`google-generativeai`)

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Supabase Account
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Resmax.git
cd Resmax
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

**Create `.env` file in the `frontend/` directory:**
```env
VITE_BACKEND_URL=http://localhost:8000
# Change VITE_BACKEND_URL to your deployed backend URL in production (e.g., https://resmax.onrender.com)
```

**Run the Frontend Development Server:**
```bash
npm run dev
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

**Create `.env` file in the `backend/` directory:**
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

secret_key=your_random_jwt_secret_key_here
algorithm=HS256
access_token_expire_minutes=1440

GEMINI_API_KEY=your_google_gemini_api_key
```

**Run the Backend Server:**
```bash
uvicorn app.app:app --reload --port 8000
```
*(Alternatively, you can run `python ./main.py` if a main entrypoint exists).*

---

## Deployment

### Frontend (e.g., Vercel, Render, Netlify)
1. Set the build command to `npm run build`.
2. Set the publish directory to `dist`.
3. Add the `VITE_BACKEND_URL` environment variable pointing to your deployed backend.

### Backend (e.g., Render, Heroku)
1. Use `uvicorn app.app:app --host 0.0.0.0 --port $PORT` as the start command.
2. Ensure you add all backend environment variables (`SUPABASE_URL`, `SUPABASE_KEY`, `secret_key`, `algorithm`, `access_token_expire_minutes`, `GEMINI_API_KEY`) to your hosting provider's dashboard.
3. Update the CORS origins in `backend/app/app.py` if necessary to include your deployed frontend domain.
