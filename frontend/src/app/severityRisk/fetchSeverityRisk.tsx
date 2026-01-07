const API_URL = process.env.NEXT_PUBLIC_API_URL

type severityRiskResponse = {
  severity_risk_score: number
  severity_risk_class: string
}

export const fetchSeverityRisk = async (features: object): Promise<severityRiskResponse> => {
  const res = await fetch(`${API_URL}/predict/severity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(features),
  });
  return await res.json()
};
