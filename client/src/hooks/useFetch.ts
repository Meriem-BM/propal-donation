import { useEffect, useState } from "react";

const APIKEY = process.env.NEXT_PUBLIC_GIPHY_API;

const useFetch = ({ keyword }: { keyword: string }) => {
  const [gifUrl, setGifUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchGifs = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      console.error("Error fetching gifs:", error);
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return { gifUrl, loading };
};

export default useFetch;
