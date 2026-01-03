type severityRiskResponse = {
  severity_risk_score: number
  severity_risk_class: string
}

export const fetchSeverityRisk = async (features: object): Promise<severityRiskResponse> => {
  const res = await fetch("http://127.0.0.1:8000/predict/severity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(features),
  });
  return await res.json()
};
