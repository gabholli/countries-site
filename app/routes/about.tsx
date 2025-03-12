export default function About() {
    return (
        <div className="bg-neutral-100 flex flex-col justify-center items-center
        p-6 m-4 rounded-2xl gap-y-4 text-center w-96">
            <h1 className="text-4xl text-center">About This Website:</h1>
            <p className="text-lg">
                This website shows information about countries throughtout the world,
                including country names, population sizes, and capitals. Also shown is each
                country flag.
            </p>
            <p className="text-lg">
                This website was designed using an API.
            </p>

        </div>
    )
}