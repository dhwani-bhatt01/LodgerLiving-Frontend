import axios from "axios";

export const API = axios.create({
	// baseURL: "http://localhost:8000/api",
	baseURL: "https://lodger-living-backend.vercel.app/api",
});
//axios fro fetching data and making http requests
