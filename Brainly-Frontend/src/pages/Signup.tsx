import { useState } from "react";
import { Input } from "../components/InputBox";
import { Button } from "../components/Button";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/config";

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSignup() {
        try {
            const response = await fetch(BACKEND_URL + "user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                navigate("/signin");
            } else {
                alert("Signup failed, User may already exist.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Error during Signup.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">

                <div className="flex items-center justify-center gap-2 mb-8">
                    <Brain className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Second Brain</h1>
                </div>

 
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Create your account</h2>
                    
                    <div className="space-y-4">
                        <Input 
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                        />
                        <Input 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                        />
                        
                        <Button
                            variant="primary"
                            text="Sign Up"
                            onClick={handleSignup}
                            widthFull={true}
                        />
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button 
                            onClick={() => navigate("/signin")}
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}