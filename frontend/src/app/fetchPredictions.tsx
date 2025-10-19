
export const fetchKernalDensityPrediction = async (lat: number, long: number) => {
  const res = await fetch("http://127.0.0.1:8000/predict/kd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat: lat, long: long }),
  });
  return await res.json()
};


