import { Blog } from "../hooks"
import { AppBar } from "./AppBar"

export const FullBlog = ({ blog }: { blog: Blog }) => {

    return <div className="bg-orange-100 h-screen">
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl">
                <div className="col-span-8 ">
                    <div className="font-extrabold text-5xl text-brown-900 pt-16">
                        {blog.title}
                    </div>
                    <div className="pt-5 font-extralight text-brown-700">
                        Posted on December 2023
                    </div>
                    <div className="pt-5 text-xl text-brown-900">  
                        {blog.content}
                    </div>
                </div>

                <div className="col-span-4 pt-16">
                    <div className="font-medium text-lg text-brown-900">
                            Author
                    </div>
                    <div className="flex w-full">
                        
                        <div className="flex-col justify-center pr-4">
                            <img className="w-12 h-12 rounded-full " src="./src/assets/nami.jpg" alt="Rounded avatar" />
                        </div>
                        <div className="font-bold text-3xl text-brown-900">    
                            {blog.author.name}
                        </div>                        

                    </div>

                    
                </div>
                

            </div>
        </div>    
    </div>
}