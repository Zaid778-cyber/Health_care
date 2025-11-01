import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [uploads, setUploads] = useState([]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setUploaded(false);
    if (selected.type.includes("image")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setUploaded(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", text);

      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / p.total);
          setProgress(percent);
        },
      });

      const newUpload = {
        id: Date.now(),
        fileType: file.type,
        fileName: file.name,
        fileUrl: preview,
        note: text,
        date: new Date().toLocaleString(),
      };

      setUploads([newUpload, ...uploads]);
      setUploaded(true);
      setText("");
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    // Example: clear local storage or session data if needed
    // localStorage.removeItem("userToken");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h1 className="dashboard-title">🩺 HealthVault Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p className="dashboard-subtitle">
          Upload and view your prescriptions in one place
        </p>

        <label className="input-label">Upload Image or PDF</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />

        {preview && (
          <div className="preview-wrapper">
            {file?.type.includes("image") ? (
              <img src={preview} alt="preview" className="preview-img" />
            ) : (
              <p className="preview-pdf">📄 {file.name}</p>
            )}
          </div>
        )}

        <label className="input-label">Add Note / Description</label>
        <textarea
          className="note-box"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write details about your prescription..."
        ></textarea>

        {uploading && (
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="progress-text">{progress}%</span>
          </div>
        )}

        <div className="button-row">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`upload-btn ${uploading ? "disabled" : ""}`}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>

          <button className="logout-btn-mobile" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {uploaded && <p className="upload-success">✅ Uploaded Successfully!</p>}
      </div>

      {uploads.length > 0 && (
        <div className="uploads-section">
          <h2 className="uploads-title">📚 Your Uploaded Prescriptions</h2>
          <div className="uploads-grid">
            {uploads.map((item) => (
              <div key={item.id} className="upload-card">
                {item.fileType.includes("image") ? (
                  <img
                    src={item.fileUrl}
                    alt={item.fileName}
                    className="upload-thumbnail"
                  />
                ) : (
                  <div className="upload-pdf-icon">📄</div>
                )}
                <div className="upload-info">
                  <p className="upload-filename">{item.fileName}</p>
                  <p className="upload-note">{item.note}</p>
                  <p className="upload-date">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
