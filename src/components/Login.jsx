import React, { useState } from "react";
import "../styles/HealthCondition.css";

export default function HealthCondition() {
  const [data, setData] = useState({
    bp: "",
    sugar: "",
    bloodGroup: "",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.bp || !data.sugar || !data.bloodGroup) return;

    const newRecord = {
      id: Date.now(),
      ...data,
      date: new Date().toLocaleString(),
    };

    setRecords([newRecord, ...records]);
    setData({ bp: "", sugar: "", bloodGroup: "" });
  };

  return (
    <div className="health-container">
      <h1>🧠 Health Condition Tracker</h1>
      <p>Enter your vitals to track your daily health progress</p>

      <form onSubmit={handleSubmit} className="health-form">
        <div className="input-row">
          <label>Blood Pressure:</label>
          <input
            type="text"
            name="bp"
            value={data.bp}
            onChange={handleChange}
            placeholder="e.g. 120/80"
          />
        </div>

        <div className="input-row">
          <label>Blood Sugar (mg/dL):</label>
          <input
            type="number"
            name="sugar"
            value={data.sugar}
            onChange={handleChange}
            placeholder="e.g. 95"
          />
        </div>

        <div className="input-row">
          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={data.bloodGroup}
            onChange={handleChange}
            placeholder="e.g. B+"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Record
        </button>
      </form>

      {records.length > 0 && (
        <div className="records-section">
          <h2>Your Recorded Vitals</h2>
          <table className="records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>BP</th>
                <th>Sugar</th>
                <th>Blood Group</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.bp}</td>
                  <td>{r.sugar}</td>
                  <td>{r.bloodGroup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
