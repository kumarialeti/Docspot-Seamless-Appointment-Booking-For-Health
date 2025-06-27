import React, { useEffect, useState } from "react";
import { getDoctors } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors().then(res => setDoctors(res.data));
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      {doctors.map(doc => (
        <div key={doc._id}>
          {doc.name} - {doc.email}
          <button onClick={() => navigate("/book/" + doc._id)}>Book</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;