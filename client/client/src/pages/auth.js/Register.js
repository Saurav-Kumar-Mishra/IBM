import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router"

export default function Register() {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [viewPassword, setViewPassword] = useState(false);

    const handleInputChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const navigate = useNavigate();

    return (
        <form className="p-4 flex flex-col gap-4 min-w-96 "
            onSubmit={handleSubmit}
        >
            <p className="text-2xl font-bold">Register</p>

            <div className="flex gap-2">

                <input className="w-full h-10 p-1 px-2" name="firstName" type="text"
                    placeholder="First Name" required
                    value={inputs.firstName}
                    onChange={handleInputChange}
                />

                <input className="w-full h-10 p-1 px-2" name="lastName" type="text"
                    placeholder="Last Name"
                    value={inputs.lastName}
                    onChange={handleInputChange}
                />

            </div>

            <input className="w-full h-10 p-1 px-2" name="email" type="email"
                placeholder="Email Address" required
                value={inputs.email}
                onChange={handleInputChange}
            />

            <div className="relative">

                <input className="w-full h-10 p-1 px-2" name="password" type={viewPassword ? "text" : "password"}
                    placeholder="Password" required
                    value={inputs.password}
                    onChange={handleInputChange}
                />

                {
                    viewPassword ?
                        <FaEye className="text-lg absolute right-2 top-1/2 text-gray-400 hover:cursor-pointer -translate-y-2"
                            onClick={() => setViewPassword(prev => !prev)} /> :
                        <FaEyeSlash className="text-lg absolute right-2 top-1/2 text-gray-400 hover:cursor-pointer -translate-y-2"
                            onClick={() => setViewPassword(prev => !prev)} />
                }

            </div>

            <input className="w-full h-10 p-1 px-2" name="confirmPassword" type="password"
                placeholder="Confirm Password" required
                value={inputs.confirmPassword}
                onChange={handleInputChange}
            />

            <button type="submit" className="bg-blue-600 rounded-sm text-white h-10">Submit</button>

            <p className="font-semibold text-stone-800 text-center">
                Do not have an account?

                <span className="text-blue-800 font-bold hover:cursor-pointer"
                    onClick={() => navigate("/auth")}
                > Login Now</span>
            </p>
        </form>
    )
}