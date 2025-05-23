import { useState } from "react";
import "./ManageEstimateSection.css";

const ManageEstimateSection = () => {
  const [view, setView] = useState("list");
  const [selectedDate, setSelectedDate] = useState("");
  
  // Sample data for estimates
  const estimates = [
    {
      id: 1,
      group: "Persian Darbar",
      chainId: 2,
      brand: "Panaya",
      zone: "Kurla",
      serviceDetails: "Shaft Maintenance",
      totalUnits: 2,
      pricePerUnit: 4000,
      total: 8000,
    },
    {
      id: 2,
      group: "Mumbai Darbar",
      chainId: 2,
      brand: "Panaya",
      zone: "Marol",
      serviceDetails: "Battery Maintenance",
      totalUnits: 6,
      pricePerUnit: 1000,
      total: 6000,
    },
    // ... other data
  ];

  const groups = ["Persian Darbar", "Mumbai Darbar", "Delhi Darbar", "Deccan Punjab", "Main Khemf"];
  const chains = [1, 2, 3, 4, 5, 6];
  const brands = ["Panaya", "Skava", "Delta Equinox"];
  const zones = ["Kurla", "Marol", "Thane", "Vashi", "Borivali", "Neelinfo"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setView("list");
  };

  return (
    <div className="manage-estimate-section">
      {/* Header */}
      <div className="estimate-header">
        <div className="header-left">
          <h1>Invoice</h1>
          <span className="header-divider">|</span>
          <span className="header-subtitle">Manage Estimate Section</span>
        </div>
        <div className="header-right">
          <span>Hi User</span>
          <span className="header-divider">|</span>
          <a href="#" className="logout-link">Logout</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="estimate-content">
        {/* Sidebar Navigation */}
        <div className="estimate-sidebar">
          <nav className="sidebar-nav">
            <a href="#" className="nav-link">Dashboard</a>
            <a href="#" className="nav-link">Manage Groups</a>
            <a href="#" className="nav-link">Manage Chain</a>
            <a href="#" className="nav-link">Manage Brands</a>
            <a href="#" className="nav-link">Manage SubZones</a>
            <a href="#" className="nav-link active">Manage Estimate</a>
            <a href="#" className="nav-link">Manage Invoices</a>
          </nav>

          {view === "list" && (
            <div className="sidebar-filters">
              <div className="filter-section">
                <h3>Filter by Brand</h3>
                <div className="filter-links">
                  <a href="#" className="filter-link">Panaya</a>
                  <a href="#" className="filter-link">Skava</a>
                  <a href="#" className="filter-link">Delta Equinox</a>
                </div>
              </div>

              <div className="filter-section">
                <h3>Filter by Group</h3>
                <div className="filter-links">
                  <a href="#" className="filter-link">Persian Darbar</a>
                  <a href="#" className="filter-link">Mumbai Darbar</a>
                  <a href="#" className="filter-link">Chennai Darbar</a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Area */}
        <div className="estimate-main">
          {view === "list" ? (
            <div className="estimate-list">
              <div className="list-header">
                <div className="total-estimate">
                  <h2>Total Estimate</h2>
                  <p>{estimates.length}</p>
                </div>
                <button className="create-btn" onClick={() => setView("create")}>Create Estimate</button>
              </div>

              <div className="estimate-table-container">
                <table className="estimate-table">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Group</th>
                      <th>Chain ID</th>
                      <th>Brand</th>
                      <th>Zone</th>
                      <th>Service Details</th>
                      <th>Total Units</th>
                      <th>Price Per Unit</th>
                      <th>Total</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimates.map((estimate) => (
                      <tr key={estimate.id}>
                        <td>{estimate.id}</td>
                        <td>{estimate.group}</td>
                        <td>{estimate.chainId}</td>
                        <td>{estimate.brand}</td>
                        <td>{estimate.zone}</td>
                        <td>{estimate.serviceDetails}</td>
                        <td>{estimate.totalUnits}</td>
                        <td>{estimate.pricePerUnit}</td>
                        <td>{estimate.total}</td>
                        <td><button className="edit-btn">Edit</button></td>
                        <td><button className="delete-btn">Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="estimate-form-container">
              <form onSubmit={handleSubmit} className="estimate-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Select Group:</label>
                    <select>
                      <option value="">Select Group</option>
                      {groups.map((group, index) => (
                        <option key={index} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Total Quantity:</label>
                    <input type="number" placeholder="Enter Total Qty" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Select Chain ID or Company Name:</label>
                    <select>
                      <option value="">Select Chain ID</option>
                      {chains.map((chain, index) => (
                        <option key={index} value={chain}>{chain}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Cost Per Quantity:</label>
                    <input type="number" placeholder="Enter Cost Per Qty" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Select Brand:</label>
                    <select>
                      <option value="">Select Brand</option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estimated Amount in Rs:</label>
                    <input type="number" placeholder="Enter Amount" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Select Zone:</label>
                    <select>
                      <option value="">Select Zone</option>
                      {zones.map((zone, index) => (
                        <option key={index} value={zone}>{zone}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Expected Delivery Date:</label>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Service Provided:</label>
                    <input type="text" placeholder="Enter Service" />
                  </div>
                  <div className="form-group">
                    <label>Other Delivery Details:</label>
                    <textarea placeholder="Enter details"></textarea>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">Create and Save Estimate</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEstimateSection;
