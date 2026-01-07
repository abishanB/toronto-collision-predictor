const API_URL = process.env.NEXT_PUBLIC_API_URL

type collisionRiskResponse = {
  collision_risk_score: number;
  collision_risk_class: "Low Risk" | "Medium Risk" | "High Risk";
};


export const fetchKernalDensityPrediction = async (lat: number, long: number): Promise<collisionRiskResponse> => {
  const res = await fetch(`${API_URL}/predict/collision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat: lat, long: long }),
  });
  return await res.json()
};

