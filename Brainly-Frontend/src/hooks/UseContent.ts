import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Types } from 'mongoose';
import { contentTypes } from '../components/Card';
import { BACKEND_URL } from "../utils/config";


export interface Content {
    // shouldnt this be Types.ObjectId?
    _id: Types.ObjectId | string;
    title: string;
    description: string;
    cardInfo?: string;
    embeddedLink: string;
    contentType: contentTypes;
    tags: string[];
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublic?: boolean;
}

export function useContent() {
    // these states are used to give more meaningful errors and info to the user in the frontend
    const [content, setContent] = useState<Content[]>([]);          // accepts the array of type Content interface only
    const [loading, setLoading] = useState(true);           // loading is set to true by default
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // since useEffect cannot be async we use the promiseified approach in order to make the async backend calls
    useEffect(() => {
        const fetchContent = async() => {
            try {
                const response = await axios.get(`${BACKEND_URL}content/`,{
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                })
                
                if(response.data.content){
                    setContent(response.data.content)
                    console.log(response.data)
                } else {
                    setError("No content available")
                }
            } catch (error) {
                if(axios.isAxiosError(error)){
                    if(error.response?.status === 401 || error.response?.status === 403){
                        alert(`Token in invalid or has expired. ${error.response?.status}`)
                        setError('Session expired - Please login again');
                        localStorage.removeItem("token")
                        navigate('/signin')
                    } else {
                        setError(`Failed to fetch content`)
                    }
                }
            } finally {
                setLoading(false);          // when the data is fetched, set loading to false 
            }
        }
        fetchContent();
    }, [navigate])

    return { content, loading, error };
}

