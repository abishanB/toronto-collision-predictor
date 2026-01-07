const API_URL = process.env.NEXT_PUBLIC_API_URL

type hoodResponse = {
  neighbourhood_name: string
  neighbourhood_number: number
  lat: number
  long: number
};

export const fetchHood = async (lat: number, long: number): Promise<hoodResponse> => {
  const res = await fetch(`${API_URL}/neighbourhood`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat: lat, long: long }),
  });
  return await res.json()
};
