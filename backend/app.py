from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="CyberGuard AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionRequest(BaseModel):
    rrCount: Optional[float] = None
    rrNameEntropy: Optional[float] = None
    ttlMean: Optional[float] = None
    ttlVariance: Optional[float] = None
    txtFrequency: Optional[float] = None


@app.get("/")
def root():
    return {"status": "Backend Running"}


@app.post("/predict")
def predict(request: PredictionRequest):
    return {
        "status": "success",
        "prediction": "placeholder",
    }
