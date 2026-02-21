import React from "react";
import axios from "axios";

const BASE_URL = "https://social-saver-backend.onrender.com";

const ContentCard = ({ item, onDelete }) => {
  if (!item) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/dashboard/delete/${item._id}`);
      onDelete(item._id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const formattedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="card">
      {item.image && (
        <img
          src={item.image}
          alt="preview"
          style={{
            width: "100%",
            borderRadius: "12px",
            objectFit: "cover",
            maxHeight: "220px"
          }}
        />
      )}

      {item.category && (
        <div className="badge">{item.category}</div>
      )}

      {item.aiSummary && <p>{item.aiSummary}</p>}

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: "#8b949e"
        }}
      >
        {formattedDate && <span>Saved on {formattedDate}</span>}

        <div style={{ display: "flex", gap: "10px" }}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open →
          </a>

          <button
            onClick={handleDelete}
            style={{
              background: "transparent",
              border: "none",
              color: "#ef4444",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;