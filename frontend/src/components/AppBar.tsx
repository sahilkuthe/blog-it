import { Link } from "react-router-dom"

export const AppBar = () => {
    return <div className="flex justify-between px-10 py-3 border-b border-brown-300 bg-orange-100">
        <Link to={"/blogs"} className="flex justify-center flex-col">
            <div className="font-bold text-xl cursor-pointer">
                Blog-It
            </div>
        </Link>
        
        <div className="flex">
            <Link to={"/publish"} className="flex justify-center flex-col">
                <div className="pr-5 ">
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create Blog</button>

                </div>
            </Link>
            <img className="w-12 h-12 rounded-full " src="./src/assets/zoro.jpg" alt="Rounded avatar" />

        </div>
    </div>
}