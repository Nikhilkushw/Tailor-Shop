# Tailor Site (Frontend)

## Run locally
```bash
cd frontend
npm i
npm run dev
```

## Build & preview
```bash
npm run build
npm run preview
```

### Customize
- Update phone numbers, address in `Navbar.jsx`, `Footer.jsx`, and `Contact.jsx`.
- Replace Google Maps embed url in `components/Map.jsx`.
- Add your own images in `src/data/works.js` (use your hosted URLs or upload to Cloudinary/Drive & make public).
- Edit offers in `src/data/offers.js`, services in `src/data/services.js`.

### Contact form backend
Set `VITE_CONTACT_ENDPOINT` in a `.env` file at project root (frontend) to your backend endpoint. Example:
```
VITE_CONTACT_ENDPOINT=http://localhost:5000/api/contact
```
If endpoint fails, the form falls back to opening your email client (mailto).
