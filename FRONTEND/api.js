import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getDoctors = () => API.get("/doctors");
export const bookAppointment = (formData) => API.post("/appointments", formData);
export const getAppointments = (userId) => API.get("/appointments/" + userId);
export const updateAppointment = (id, status) => API.patch("/appointments/update/" + id, status);