import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="flex justify-center">
            <div className=" mt-20">
            
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
            
        </div>
        


    }
    return <div>
        <div>
            <AppBar />
        </div>


        < div className = "flex justify-center bg-orange-100 h-screen" >
            <div className="max-w-2xl">
                {blogs.map(blog => <BlogCard id={blog.id} avatar="./src/assets/luffy.jpg"
                    authorName={blog.author.name || "Anonymous"}
                    publishedDate="Dec 3 2023"
                    title={blog.title}
                    content={blog.content} />
                )}

        
                </div>
            </div>
        </div>
} 