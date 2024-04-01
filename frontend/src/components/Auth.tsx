import {  SignupInput } from "@zekrozo/blog-it-comm"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"


export const Auth = () => {
    const [postInput, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    return <div className="h-screen flex justify-center flex-col">
        <div>
            
        </div>
        <div className="flex justify-center font-extrabold text-4xl">       {/*Heading */}
            Create an account
        </div>
        <div className="flex justify-center text-slate-400">
            Already have an account?
            <Link className="underline ml-2" to={"/signin"} >
                Login
            </Link>
        </div> 

        <div className="flex justify-center ">
            <LabelledInput label="Username" placeholder="Enter username" onChange={(e) => {
                setPostInputs({
                    ...postInput,
                    username: e.target.value
                })
            }}/>
        </div>

        <div className="flex justify-center ">
            <LabelledInput label="Password" type={"password"} placeholder="Enter password" onChange={(e) => {
                setPostInputs({
                    ...postInput,
                    password: e.target.value
                })
            }}/>
        </div>
        <div className="flex justify-center ">
            <LabelledInput label="Name" placeholder="Enter your Name" onChange={(e) => {
                setPostInputs({
                    ...postInput,
                    name: e.target.value
                })
            }}/>
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
        <label className="block mb-2 text-sm font-medium text-gray-900">{ label}</label>
        <input onChange={ onChange } type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>                                  
}