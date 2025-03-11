import { useState } from "react";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";

export async function clientLoader({ request }: LoaderFunctionArgs) {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const data = response.json()
    console.log(data)
    return data
}

export default function Countries() {
    const [search, setSearch] = useState("")
    const data = useLoaderData()

    const filteredCountries = data?.filter((country: any) => {
        const matchesSearch =
            !search || country.name.common.toLowerCase().includes(search.toLowerCase())
        return matchesSearch
    })

    const sortedData = filteredCountries?.sort((a: any, b: any) => {
        return a.name.common.localeCompare(b.name.common)
    })

    const listOfCountries = sortedData?.map((country: any) => {
        return (
            <Link
                key={country.name.common}
                to="#"
                className="text-normal flex flex-col justify-center items-center
                    bg-neutral-100 px-2 py-4 rounded-3xl shadow-xl"
            >
                <p className="font-bold">{country.name.common}</p>
                <p>{country.region}</p>
                <p>Population: {country.population}</p>
            </Link>
        )
    })

    console.log(listOfCountries)

    return (
        <div className="flex flex-col justify-center items-center gap-y-8 mt-8 mb-8">
            <input
                className="px-2 py-4 indent-4 rounded-2xl border-black border-2"
                placeholder="Enter country here..."
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
            >
            </input>
            <h1 className="font-extrabold text-2xl">List of countries:</h1>
            <main className="flex flex-col justify-center items-center gap-y-8
                md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {listOfCountries}
            </main>
        </div>
    )
}