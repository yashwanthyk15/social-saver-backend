import React from "react";

const ContentCard = ({ item }) => {
  if (!item) return null;

  const formattedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="card">
      {/* Image Preview */}
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

      {/* Category Badge */}
      {item.category && (
        <div className="badge">{item.category}</div>
      )}

      {/* AI Summary */}
      {item.aiSummary && (
        <p>{item.aiSummary}</p>
      )}

      {/* Footer Section */}
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
        {formattedDate && (
          <span>Saved on {formattedDate}</span>
        )}

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Link →
          </a>
        )}
      </div>
    </div>
  );
};

export default ContentCard;