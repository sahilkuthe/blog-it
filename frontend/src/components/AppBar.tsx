export const AppBar = () => {
    return <div className="flex justify-between px-10 py-3 border-b border-brown-300 bg-orange-100">
        <div className="flex justify-center flex-col font-bold text-xl">
            Blog-It
        </div>
        <div className="flex justify-center flex-col">
            <img className="w-12 h-12 rounded-full " src="./src/assets/zoro.jpg" alt="Rounded avatar" />

        </div>
    </div>
}