import {  SignupInput } from "@zekrozo/blog-it-comm"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"


export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [postInput, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    return <div className="h-screen flex justify-center flex-col bg-orange-100 ">
        <div className="flex justify-center">
            <div>
                <div className="px-16">
                    <div className="font-extrabold text-4xl text-brown-900">       {/*Heading */}
                        {type === "signup"? "Create an account" : "Log in your account"}
                    </div>
                    <div className="text-brown-800">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="underline ml-2" to={ type === "signup" ? "/signin": "/signup"} > {type === "signup" ? "Login" : "Signup"} </Link>    
                    </div>
                </div>
             
                <div>
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Roronoa Zoro" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            name: e.target.value
                        })
                    }} /> : ""}
                    
                    
                    <LabelledInput label="Username" placeholder="example@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            username: e.target.value
                        })
                    }} />
                    
                    <LabelledInput label="Password" type={"password"} placeholder="" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            password: e.target.value
                        })
                    }} />
                    <div>
                        <button type="button" className="text-white text-lg font-bold bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-400 rounded-lg px-5 py-2.5 me-2 mb-2 :bg-blue-600 w-full mt-7 ">{ type=== "signup" ? "Sign up" : "Sign in" }</button>

                    </div>

                    
                    
                </div>
            </div>
        </div>
    </div>
}

interface InputBoxType{
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

const LabelledInput = ({label, placeholder, type, onChange}: InputBoxType) => {
    return <div>
        <label className="block mb-2 text-lg font-bold text-brown-900">{ label}</label>
        <input onChange={ onChange } type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full" placeholder={placeholder} required />
    </div>                                  
}

