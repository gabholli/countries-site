import { useEffect, useState } from "react";

export default function BackToTop() {
    const [backToTopButton, setBackTopTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackTopTopButton(true)
            } else {
                setBackTopTopButton(false)
            }
        })
    }, [])

    function scrollUp() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div>
            {backToTopButton && (
                <button
                    className="fixed text-white bottom-10 right-10 text-4xl bg-black px-2 py-4 rounded-2xl"
                    onClick={scrollUp}
                >
                    ^
                </button>
            )}
        </div>
    )
}