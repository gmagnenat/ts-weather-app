import axios from "axios";

export interface LocationInfo {
  lat: string;
  lon: string;
  display_name: string;
}

export async function fetchLocationData(
  apiUrl: string,
  locationName: string,
  apiKey?: string
): Promise<LocationInfo> {
  const options = {
    method: "GET",
    url: apiUrl,
    params: {
      q: locationName,
      api_key: apiKey,
    },
  };

  const response = await axios.request<LocationInfo[]>(options);
  if (response.status === 200) {
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error(
        `Unable to find location information for ${locationName}`
      );
    }
  } else {
    throw new Error("Failed to fetch location data");
  }
}
