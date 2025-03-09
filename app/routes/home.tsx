import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-2 gap-y-4 text-2xl">
      <h1 className="text-center md:w-80">Welcome to REST Countries, a site where you can find out about your favorite country</h1>
      <Link
        to="countries"
        className="border-2 rounded-full py-2 px-4 bg-blue-400 text-white"
      >Find out about a country
      </Link>
    </div>
  )
}
