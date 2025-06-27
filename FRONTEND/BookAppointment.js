import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { bookAppointment } from "../services/api";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("patient", user._id);
    formData.append("doctor", doctorId);
    formData.append("date", date);
    for (let file of files) {
      formData.append("documents", file);
    }

    try {
      await bookAppointment(formData);
      alert("Appointment requested");
    } catch {
      alert("Failed to book");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookAppointment;