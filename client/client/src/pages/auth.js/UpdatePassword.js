import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function UpdatePassword() {
    const [inputs, setInputs] = useState({
        password: "",
        confirmPassword: "",
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


    return (
        <form className="p-4 flex flex-col gap-4 min-w-96 "
            onSubmit={handleSubmit}
        >
            <p className="text-2xl font-bold">Update Password</p>

            <p className="text-base">
                A password must contain atleast 6 characters, including one lowercase letter, one uppercase letter and a number.
            </p>

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
        </form>
    )
}