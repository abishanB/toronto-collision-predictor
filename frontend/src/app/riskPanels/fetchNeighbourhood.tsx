type hoodResponse = {
  neighbourhood_name: string
  neighbourhood_number: number
  lat: number
  long: number
};

export const fetchHood = async (lat: number, long: number): Promise<hoodResponse> => {
  const res = await fetch("http://127.0.0.1:8000/neighbourhood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat: lat, long: long }),
  });
  return await res.json()
};
