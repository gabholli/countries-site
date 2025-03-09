import { Link, Outlet } from "react-router";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-dvh">
            <nav className="border-b-2 flex justify-center items-center h-24">
                <Link
                    className="text-2xl"
                    to="/"
                >
                    REST <span className="text-blue-400 italic">Countries</span>
                </Link>
            </nav>
            <div className="flex flex-grow items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}