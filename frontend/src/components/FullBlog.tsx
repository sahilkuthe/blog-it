import { Blog } from "../hooks"
import { AppBar } from "./AppBar"

export const FullBlog = ({ blog }: { blog: Blog }) => {

    return <div>
        <AppBar />
        <div className="grid grid-cols-12 bg-orange-100 h-screen px-10">


            <div className="col-span-8 ">
                <div className="font-extrabold text-5xl pt-16">
                    {blog.title}
                </div>
                <div className="pt-5 text-xl">  
                    {blog.content}
                </div>
            </div>

            <div className="col-span-4 pt-16">
                <div className="font-medium text-lg">
                    Author
                </div>
                <div>
                    Ava
                </div>

                <div className="font-bold text-3xl">    
                    {blog.author.name}
                </div>
                
            </div>
            

        </div>
    </div>
}