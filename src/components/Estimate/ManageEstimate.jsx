import { useState } from "react";
import "./ManageEstimate.css";

const ManageEstimate = () => {
  const [view, setView] = useState("list");
  const [date, setDate] = useState("");
  const [estimates, setEstimates] = useState([
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
    // Add more estimates here
  ]);
  const [formData, setFormData] = useState({
    group: "",
    chainId: "",
    brand: "",
    zone: "",
    serviceDetails: "",
    totalUnits: "",
    pricePerUnit: "",
    total: "",
  });
  const [editId, setEditId] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);  // Add state for invoice

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = parseInt(formData.totalUnits) * parseInt(formData.pricePerUnit);

    if (editId) {
      const updated = estimates.map((item) =>
        item.id === editId ? { ...formData, id: editId, total: total } : item
      );
      setEstimates(updated);
      setEditId(null);
    } else {
      const newEstimate = {
        ...formData,
        id: estimates.length + 1,
        total: total,
      };
      setEstimates([...estimates, newEstimate]);
    }

    setFormData({
      group: "",
      chainId: "",
      brand: "",
      zone: "",
      serviceDetails: "",
      totalUnits: "",
      pricePerUnit: "",
      total: "",
    });
    setDate("");
    setView("list");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this estimate?")) {
      const updated = estimates.filter((item) => item.id !== id);
      setEstimates(updated);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      group: item.group,
      chainId: item.chainId,
      brand: item.brand,
      zone: item.zone,
      serviceDetails: item.serviceDetails,
      totalUnits: item.totalUnits,
      pricePerUnit: item.pricePerUnit,
      total: item.total,
    });
    setDate("");
    setEditId(item.id);
    setView("create");
  };

  // Function to generate invoice
  const handleGenerateInvoice = (estimate) => {
    // Create invoice data from the estimate
    const newInvoice = {
      invoiceId: `INV-${Date.now()}`,
      group: estimate.group,
      chainId: estimate.chainId,
      brand: estimate.brand,
      zone: estimate.zone,
      serviceDetails: estimate.serviceDetails,
      totalUnits: estimate.totalUnits,
      pricePerUnit: estimate.pricePerUnit,
      totalAmount: estimate.total,
      date: new Date().toLocaleDateString(),
    };

    // Save the generated invoice data
    setInvoiceData(newInvoice);
    alert("Invoice generated successfully!");
  };

  return (
    <div className="manage-estimate-container">
      {view === "list" ? (
        <div className="estimate-list-view">
          <div className="estimate-summary">
            <div className="total-estimate-card">
              <h3>Total Estimate</h3>
              <p>{estimates.length}</p>
            </div>
            <button className="create-estimate-btn" onClick={() => setView("create")}>
              Create Estimate
            </button>
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
                  <th>Generate Invoice</th>
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
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(estimate)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(estimate.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button className="generate-btn" onClick={() => handleGenerateInvoice(estimate)}>
                        Generate Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // The form view code remains the same
        <div className="create-estimate-view">
          <form onSubmit={handleSubmit} className="estimate-form">
            <input type="text" name="group" value={formData.group} onChange={handleChange} placeholder="Group" />
            <input type="text" name="chainId" value={formData.chainId} onChange={handleChange} placeholder="Chain ID" />
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" />
            <input type="text" name="zone" value={formData.zone} onChange={handleChange} placeholder="Zone" />
            <input type="text" name="serviceDetails" value={formData.serviceDetails} onChange={handleChange} placeholder="Service Details" />
            <input type="number" name="totalUnits" value={formData.totalUnits} onChange={handleChange} placeholder="Total Units" />
            <input type="number" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} placeholder="Price Per Unit" />

            <button type="submit" className="save-estimate-btn">
              {editId ? "Update Estimate" : "Create and Save Estimate"}
            </button>
          </form>

        </div>
      )}

      {/* Display Invoice Data (Optional) */}
      {invoiceData && (
        <div className="invoice-summary">
          <h3>Invoice Generated</h3>
          <p>Invoice ID: {invoiceData.invoiceId}</p>
          <p>Date: {invoiceData.date}</p>
          <p>Group: {invoiceData.group}</p>
          <p>Chain ID: {invoiceData.chainId}</p>
          <p>Brand: {invoiceData.brand}</p>
          <p>Zone: {invoiceData.zone}</p>
          <p>Service: {invoiceData.serviceDetails}</p>
          <p>Total Units: {invoiceData.totalUnits}</p>
          <p>Price Per Unit: {invoiceData.pricePerUnit}</p>
          <p>Total Amount: {invoiceData.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default ManageEstimate;
