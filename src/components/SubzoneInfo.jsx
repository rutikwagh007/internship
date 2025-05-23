import React, { useState } from "react";

const SubzoneInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        {isOpen ? "Hide Info" : "About Subzone Management"}
      </button>

      {isOpen && (
        <div style={{ lineHeight: "1.6" }}>
          <p>
            In the system, each Brand Name is further subdivided into multiple Subzones (e.g., Marol, Kurla). This structure allows for granular tracking of activities like performance, revenue, and invoicing.
          </p>
          <p><strong>Functionalities:</strong></p>
          <ul>
            <li><strong>Adding Subzones:</strong> Create new subzones associated with a Brand. Brand ID is mandatory.</li>
            <li><strong>Updating Subzones:</strong> Edit zone name or brand. Reflect latest operational realities.</li>
            <li><strong>Deleting Subzones:</strong> Soft delete using an `is_active` boolean flag.</li>
          </ul>
          <p>
            Filters: The dashboard allows filtering by Brand, Company, and Group. These provide localized insights and better management.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubzoneInfo;
