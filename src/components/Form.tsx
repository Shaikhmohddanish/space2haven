"use client"
import { useState } from "react"
import Input from "./Input"

const Form = () => {
    const [authDetails, setAuthDetails] = useState({
        email: "",
        password: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAuthDetails(prevDetails => ({ ...prevDetails, [name]: value }))
    }

    const submitDetails = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(authDetails)
    }

    return (
        <form onSubmit={submitDetails}>
            <Input
                title="Email ID"
                value={authDetails.email}
                placeholder="Enter your Email ID"
                type="email"
                name="email"
                onChange={handleInputChange}
            />

            <Input
                title="Password"
                value={authDetails.password}
                placeholder="Enter your password"
                type="password"
                name="password"
                onChange={handleInputChange}
            />

            <button type="submit" className="btn-class">
                Sign In
            </button>
        </form>
    )
}

export default Form
