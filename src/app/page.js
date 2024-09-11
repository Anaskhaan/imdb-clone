import Results from "@/Components/Results";
import { resolve } from "styled-jsx/css";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || "fetchTrending";
  const res = await fetch(
    `https://api.tmdb.org/3${
      genre === "fetchTopRated" ? "/movie/top_rated" : "/trending/all/week"
    }?api_key=${API_KEY}& language=en-US&page1`,
    { next: { revalidate: 10000 } }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
