import { useState } from "react";
import { Input } from "../components/InputBox";
import { Button } from "../components/Button";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSignin() {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            })
            console.log(response.data);

            if(response.data){
                // set the token in auth header
                localStorage.setItem("token", response.data.token);   
                axios.defaults.headers.common["Authorization"] = response.data.token
                navigate('/dashboard');
            } else {
                console.error("Signin Failed")
            }
        } catch (error) {
            console.error("Error during signup:", error);
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
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign in to your account</h2>
                    
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
                            text="Sign In"
                            onClick={handleSignin}
                            widthFull={true}
                        />
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button 
                            onClick={() => navigate("/signup")}
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}