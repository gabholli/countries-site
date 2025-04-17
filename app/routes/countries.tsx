import { useEffect, useState } from "react";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import BackToTop from "~/components/backToTop";

export async function clientLoader({ request }: LoaderFunctionArgs) {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const data = await response.json()
    console.log(data)
    return data
}

export default function Countries() {
    const searchItemFromLocalStorage = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("searchItem") || '""')
        : ""
    const [search, setSearch] = useState("")
    const [region, setRegion] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const countriesPerPage = 10 // Number of countries per page

    const data = useLoaderData()

    function handleChange(event: { target: { name: any; value: any; }; }) {
        setSearch(event.target.value)
        localStorage.setItem("searchItem", JSON.stringify(event.target.value))
    }
    useEffect(() => {
        setCurrentPage(1)
    }, [search, region])

    const filteredCountries = data?.filter((country: any) => {
        const matchesRegion = !region || country.region.toLowerCase().includes(region.toLowerCase())
        const matchesSearch = !search || country.name.common.toLowerCase().includes(search.toLowerCase())
        return matchesSearch && matchesRegion
    })

    const sortedData = filteredCountries?.sort((a: any, b: any) => {
        return a.name.common.localeCompare(b.name.common)
    })

    // Pagination logic
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = sortedData?.slice(indexOfFirstCountry, indexOfLastCountry)

    const listOfCountries = currentCountries?.map((country: any) => {
        return (
            <Link
                key={country.name.common}
                to={country.name.common}
                className="text-normal flex flex-col justify-center 
                    bg-neutral-100 w-74 px-8 py-4 rounded-3xl shadow-xl"
            >
                <p className="font-bold">{country.name.common}</p>
                <p>{country.region}</p>
                <p>Population: {country.population.toLocaleString()}</p>
            </Link>
        )
    })

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(sortedData?.length / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-y-8 mt-8 mb-8">
            <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-4">
                <input
                    className="px-2 py-4 indent-4 rounded-2xl bg-black text-white border-2 border-white"
                    placeholder="Enter country here..."
                    type="text"
                    value={searchItemFromLocalStorage || ""}
                    onChange={handleChange}
                >
                </input>
                <select
                    className="text-white bg-black text-xl px-2 py-4 rounded-2xl border-2 border-white"
                    onChange={(e) => { setRegion(e.target.value) }}
                >
                    <option value="">Select a region</option>
                    <option value="americas">Americas</option>
                    <option value="europe">Europe</option>
                    <option value="africa">Africa</option>
                    <option value="asia">Asia</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>
            <h1 className="font-extrabold text-2xl text-white">List of countries:</h1>
            {listOfCountries.length > 0 ? (
                <main className="flex flex-col justify-center items-center gap-8
                    md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                    {listOfCountries}
                </main>
            ) :
                <h1 className="text-white font-bold text-xl">No results...</h1>
            }
            <nav className="w-74 bg-neutral-100 px-2 py-4 rounded-2xl">
                <ul className="flex flex-wrap justify-center items-center gap-4">
                    {pageNumbers.map(number => (
                        <li key={number} className="">
                            <button
                                onClick={() => paginate(number)}
                                className="cursor-pointer w-4 hover:underline hover:bg-neutral-200 hover:rounded-full"
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <BackToTop />
        </div>
    )
}
