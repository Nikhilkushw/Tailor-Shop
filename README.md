# Tailor Shop Website – Monorepo

This bundle contains:
- `frontend/` (React + Vite + Tailwind + React Router)
- `backend/` (Express + Nodemailer) – optional for the contact form

## Quick start
1) Frontend
```bash
cd frontend
npm i
npm run dev
```

2) Backend (optional for contact form)
```bash
cd backend
cp .env.example .env
# Edit .env with your SMTP credentials
npm i
npm start
```

3) Connect frontend to backend by setting `VITE_CONTACT_ENDPOINT` in `frontend/.env`.
