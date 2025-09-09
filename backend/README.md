# Tailor Site (Backend API for contact form)

## Run locally
```bash
cd backend
npm i
npm run start
```
or with auto-reload if nodemon is installed:
```bash
npm run dev
```

## Configure
- Copy `.env.example` to `.env` and fill in your SMTP details.
- Update `RECEIVER_EMAIL` to the inbox where you want messages.

## Use with frontend
In the frontend, create `.env` and set:
```
VITE_CONTACT_ENDPOINT=http://localhost:5000/api/contact
```
Then submit the form at **/contact**.
