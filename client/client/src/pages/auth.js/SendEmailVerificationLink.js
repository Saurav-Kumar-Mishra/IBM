import { useState } from "react"

export default function SendEmailVerificationLink() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="p-4 flex flex-col gap-4 min-w-96 "
            onSubmit={handleSubmit}
        >
            <p className="text-2xl font-bold">Email Verification</p>

            <p className="text-base">
                A email with verification email will be sent to the given email address, you have to click on that link to proceed
            </p>

            <input className="w-full h-10 p-1 px-2" name="email" type="email"
                placeholder="Email Address" required
                value={email}
                onChange={()=>setEmail(this.value)}
            />

            <button type="submit" className="bg-blue-600 rounded-sm text-white h-10">
                Send Verification Link
            </button>
        </form>
    )
}