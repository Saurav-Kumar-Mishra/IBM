import { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/user";

export default function Login() {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const [viewPassword, setViewPassword] = useState(false);
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(inputs).unwrap();
            dispatch(setUser(user));
            sessionStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        } catch (e) {
            alert("Invalid Login Details");
        }
    };

    return (
        <form className="p-4 flex flex-col gap-4 min-w-96" onSubmit={handleSubmit}>
            <p className="text-2xl font-bold">Login</p>

            <input
                className="w-full h-10 p-1 px-2"
                name="email"
                type="email"
                placeholder="Email Address"
                required
                value={inputs.email}
                onChange={handleInputChange}
            />

            <div className="relative">
                <p
                    className="text-sm font-semibold pl-1 text-red-600 hover:cursor-pointer"
                    onClick={() => navigate("/auth/verifyEmail")}
                >
                    Forgot Password?
                </p>

                <input
                    className="w-full h-10 p-1 px-2"
                    name="password"
                    type={viewPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={inputs.password}
                    onChange={handleInputChange}
                />

                {viewPassword ? (
                    <FaEye
                        className="text-lg absolute right-2 top-1/2 text-gray-400 hover:cursor-pointer translate-y-0.5"
                        onClick={() => setViewPassword(prev => !prev)}
                    />
                ) : (
                    <FaEyeSlash
                        className="text-lg absolute right-2 top-1/2 text-gray-400 hover:cursor-pointer translate-y-0.5"
                        onClick={() => setViewPassword(prev => !prev)}
                    />
                )}
            </div>

            <button type="submit" className="bg-blue-600 rounded-sm text-white h-10">Submit</button>

            <p className="font-semibold text-stone-800 text-center">
                Do not have an account?
                <span
                    className="text-blue-800 font-bold hover:cursor-pointer"
                    onClick={() => navigate("/auth/register")}
                >
                    {" "}Register Now
                </span>
            </p>
        </form>
    );
}
