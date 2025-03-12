import { useLoaderData } from "react-router";
import type { Route } from "../+types/root";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const country = params.country
    const res = await fetch(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
    )
    return await res.json()
}

export default function countryDetail() {
    const data = useLoaderData()
    console.log(data)
    const countryInfo = {
        name: data[0]?.name?.common || "N/A ",
        flagImage: data[0]?.flags?.png || "N/A",
        altText: data[0]?.flags?.alt || "N/A",
        region: data[0]?.region || "N/A",
        population: data[0]?.population || "N/A",
        capital: data[0]?.capital[0] || "N/A"
    }

    return (
        <main className="flex flex-col justify-center items-center gap-y-10 p-4 m-4 bg-neutral-100
            rounded-2xl">
            {countryInfo.flagImage && (
                <img
                    className="shadow-2xl"
                    src={countryInfo.flagImage}
                    alt={countryInfo.altText}
                >
                </img>
            )}

            <h1><span className="font-bold text-lg">Country Name:</span> {countryInfo.name}</h1>
            <h1><span className="font-bold text-lg">Region:</span> {countryInfo.region}</h1>
            <h1><span className="font-bold text-lg">Population</span> {countryInfo.population}</h1>
            <h1><span className="font-bold text-lg">Capital City:</span> {countryInfo.capital}</h1>
        </main>
    )
}