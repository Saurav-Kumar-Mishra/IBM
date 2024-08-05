import { useEffect } from "react"

export default function Loader() {

    useEffect(() => {

        const handleEvent = (event) => {
            event.stopPropogation();
            event.preventDefault();
        }

        document.addEventListener("scroll", handleEvent, true);
        document.addEventListener("click", handleEvent, true);
        document.addEventListener("touchstart", handleEvent, true);
        document.addEventListener("keydown", handleEvent, true);

        return () => {
            document.removeEventListener("scroll", handleEvent, true);
            document.removeEventListener("click", handleEvent, true);
            document.removeEventListener("touchstart", handleEvent, true);
            document.removeEventListener("keydown", handleEvent, true);
        }
    })

    return (
        <div className="w-full h-screen fixed inset-0 z-[9999] flex justify-center items-center bg-white bg-opacity-10 ">
            <p>Loading...</p>
        </div>
    )
}