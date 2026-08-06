# The Whispering Manor

> An atmospheric, interactive 3D haunted mansion experience built with Python + React Three Fiber / Three.js.

**Halloween 2026 Portfolio Project**  
Developed in clear stages. Each stage is completed and polished before moving to the next.

---

## Current Status

**Stage 1 – Atmosphere Foundation** ✅ (pushed)

You can walk through a dark multi-room Victorian mansion with:
- First-person controls
- Flickering candles
- Moonlight + lightning flashes
- Floating dust particles
- Cinematic post-processing (bloom, film grain, vignette, chromatic aberration)
- Live Python backend

---

## Concept

You arrive at **The Whispering Manor** — a decaying Victorian estate trapped outside of normal time.  
The house itself is the antagonist. It feeds on fear and can manifest the greatest icons of horror as echoes and full manifestations (Michael Myers, Leatherface, Jason Voorhees, Freddy Krueger, T-800 endoskeleton, T-1000 liquid metal, etc.).

These will be added in later stages.

---

## Tech Stack

**Backend**
- Python 3.12+
- FastAPI

**Frontend**
- React 18 + TypeScript
- Vite
- React Three Fiber + Drei + Postprocessing
- Three.js

---

## Getting Started in Codespaces

1. Open this repository in GitHub Codespaces
2. Open two terminals:

**Terminal 1 – Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2 – Frontend**
```bash
cd frontend
npm install
npm run dev -- --host
```

3. Click the Ports tab → open the frontend URL (usually port 5173)
4. Click the screen to lock the mouse, then use **WASD + Mouse** to explore

---

## Project Structure

```
the-whispering-manor/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Lighting.tsx
│   │   │   ├── Mansion.tsx
│   │   │   ├── Particles.tsx
│   │   │   ├── Player.tsx
│   │   │   ├── PostProcessing.tsx
│   │   │   └── UI.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Development Stages

1. **Atmosphere Foundation** ← You are here
2. Python gives the house life (dynamic events + seed system)
3. Interaction Layer (doors, objects, inventory)
4. Full Horror Polish (the classic icons + advanced effects)
5. Production & Sharing

---

**Let’s build something unforgettable.**
