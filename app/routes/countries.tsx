import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";

export async function clientLoader({ request }: LoaderFunctionArgs) {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const data = response.json()
    console.log(data)
    return data
}

export default function Countries() {
    const data = useLoaderData()

    const listOfCountries = data?.map((country: any) => {
        return (
            <Link
                to="#"
                className="text-normal"
            >
                {country.name.common}
            </Link>
        )
    })

    console.log(listOfCountries)

    return (
        <div className="flex flex-col justify-center items-center gap-y-8 mt-8">
            <h1 className="font-bold text-2xl">List of countries:</h1>
            <main className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listOfCountries}
            </main>
        </div>
    )
}