import { Link } from "react-router-dom"

interface BlogCardType{
    id: string,
    avatar: string,
    authorName: string,
    publishedDate: string,
    title: string,
    content: string
}


export const BlogCard = ({ id, avatar, authorName, publishedDate, title, content }: BlogCardType) => {
    return <Link to={`/blog/${id}`}>
        <div className="bg-orange-100 border-b border-brown-300 pb-4 cursor-pointer">
            <div className="flex"> 
                <div className="flex justify-center flex-col">
                    <img className="w-10 h-10 rounded-full " src={avatar} alt="Rounded avatar" />
                </div>

                <div className="flex justify-center flex-col text-brown-900 font-semibold text-lg">
                    {authorName}
                </div>

                <div className="flex justify-center flex-col pl-3 pr-2">
                    <Dot />
                </div>

                <div className="flex justify-center flex-col text-brown-800 font-light text-sm">
                    {publishedDate}
                </div>
                
                
            </div>
            <div className="text-brown-900 font-extrabold text-2xl pt-2">
                {title}
            </div>
            <div className="text-brown-900 text-lg">
                {content.slice(0, 100) + "..."}
            </div>

            <div className=" text-brown-800 font-light text-sm pt-2">
                {`${Math.ceil(content.length/500)} minute read`}
            </div>
        
        </div>
    </Link>
}

function Dot() {    
    return <div className="h-1 w-1 rounded-full bg-brown-800">

    </div>
}