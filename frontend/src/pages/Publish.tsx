import axios from "axios"
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate()
    return <div className="bg-orange-100 h-screen">
        <AppBar/>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-orange-100 placeholder-brown-600 border-b-2 border-brown-600  text-brown-900 text-5xl font-bold rounded-lg  outline-none w-full p-2.5" placeholder="Title" />
                
                
                <Editor onChange={(e) => {
                    setContent(e.target.value)
                }} />
                
                <button onClick={async() => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blogs`, {
                        title,
                        content
                    }, {
                        headers: {
                            authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Publish
                </button>
            </div>
            
    
                
        </div>
        
        
        
    </div> 
}

function Editor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="mt-2 w-full mb-4 border border-orange-100 rounded-lg  ">
        
        <div className="flex items-center justify-between">
            <div className="px-4 py-2  rounded-t-lg ">
                <textarea onChange={onChange} id="comment" rows={8} cols={250} className="w-full px-0 outline-none border-none text-brown-900 bg-orange-100 text-lg placeholder-brown-600  " placeholder="Write your blog..." required />
            </div >
        </div>
            <div className="flex items-center justify-between px-3 py-2 border-t ">
                
            </div>
    </div>
    
   



}