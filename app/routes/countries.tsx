import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";

export async function clientLoader({ request }: LoaderFunctionArgs) {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const data = response.json()
    console.log(data)
    return data
}

export default function Countries() {
    const data = useLoaderData()

    const sortedData = data?.sort((a: any, b: any) => {
        return a.name.common.localeCompare(b.name.common)
    })

    const listOfCountries = sortedData?.map((country: any) => {
        return (
            <Link
                key={country.name.common}
                to="#"
                className="text-normal hover:underline flex flex-col justify-center items-center
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
            <h1 className="font-extrabold text-2xl">List of countries:</h1>
            <main className="flex flex-col justify-center items-center gap-y-8
                md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {listOfCountries}
            </main>
        </div>
    )
}