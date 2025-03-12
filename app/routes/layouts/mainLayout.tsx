import { Link, Outlet } from "react-router";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-dvh">
            <nav className="border-b-2 flex justify-center items-center h-24 gap-x-6">
                <Link
                    className="text-2xl"
                    to="/"
                >
                    REST <span className="text-blue-400 italic">Countries</span>
                </Link>
                <Link
                    to="about"
                    className="text-2xl"
                >
                    About
                </Link>
            </nav>
            <div className="flex flex-grow items-center justify-center
                bg-cover bg-center bg-fixed
            "
                style={{ backgroundImage: "url('city.jpg')" }}
            >
                <Outlet />
            </div>
        </div>
    )
}