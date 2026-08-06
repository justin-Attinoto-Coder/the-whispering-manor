from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time

app = FastAPI(title="The Whispering Manor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Atmosphere(BaseModel):
    fog_density: float
    candle_intensity: float
    moonlight_intensity: float
    fear_level: float
    lightning_chance: float
    timestamp: float

@app.get("/health")
def health():
    return {"status": "The house is listening..."}

@app.get("/api/atmosphere", response_model=Atmosphere)
def get_atmosphere(seed: int = 42):
    random.seed(seed + int(time.time() / 30))  # changes slowly over time

    return Atmosphere(
        fog_density=random.uniform(0.018, 0.035),
        candle_intensity=random.uniform(0.6, 1.4),
        moonlight_intensity=random.uniform(0.15, 0.35),
        fear_level=min(1.0, random.uniform(0.1, 0.55)),
        lightning_chance=random.uniform(0.002, 0.008),
        timestamp=time.time()
    )
