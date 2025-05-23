import React, { useState, useEffect } from "react";
import SubzoneInfo from "../components/SubzoneInfo";
import "./ManageSubzone.css";

const brands = [
  { id: 1, name: "Panaya", company: "Delta Tech Pvt Ltd", group: "Persian Darbar" },
  { id: 2, name: "Skava", company: "NeelInfo", group: "Mumbai Darbar" },
  { id: 3, name: "Delta Equinox", company: "Delta Tech Pvt Ltd", group: "Chennai Darbar" },
];

export default function ManageSubzones() {
  const [zones, setZones] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", brandId: "" });
  const [filter, setFilter] = useState({ brand: "", company: "", group: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("zones")) || [];
    setZones(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("zones", JSON.stringify(zones));
  }, [zones]);

  const handleSubmit = () => {
    if (!form.name || !form.brandId) return alert("All fields required");
    const brand = brands.find(b => b.id === parseInt(form.brandId));

    if (form.id) {
      setZones(zones.map(z => z.id === form.id ? { ...z, name: form.name, brand } : z));
    } else {
      const newZone = {
        id: Date.now(),
        name: form.name,
        brand,
        is_active: true,
      };
      setZones([...zones, newZone]);
    }

    setForm({ id: null, name: "", brandId: "" });
  };

  const handleEdit = (zone) => {
    setForm({ id: zone.id, name: zone.name, brandId: zone.brand.id });
  };

  const handleDelete = (id) => {
    setZones(zones.map(z => z.id === id ? { ...z, is_active: false } : z));
  };

  const filteredZones = zones.filter(z =>
    z.is_active &&
    (!filter.brand || z.brand.name === filter.brand) &&
    (!filter.company || z.brand.company === filter.company) &&
    (!filter.group || z.brand.group === filter.group)
  );

  return (
    <div style={{ padding: "20px" }}>
      <SubzoneInfo />

      <h2>Manage Subzones</h2>

      <input
        type="text"
        placeholder="Enter Zone Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <select
        value={form.brandId}
        onChange={(e) => setForm({ ...form, brandId: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      >
        <option value="">Select Brand</option>
        {brands.map(b => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      <button onClick={handleSubmit} style={{ padding: "6px 12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
        {form.id ? "Update Zone" : "Add Zone"}
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h3>Filters</h3>
      <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
        <select onChange={(e) => setFilter({ ...filter, brand: e.target.value })}>
          <option value="">Filter by Brand</option>
          {[...new Set(zones.map(z => z.brand.name))].map(b => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <select onChange={(e) => setFilter({ ...filter, company: e.target.value })}>
          <option value="">Filter by Company</option>
          {[...new Set(zones.map(z => z.brand.company))].map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select onChange={(e) => setFilter({ ...filter, group: e.target.value })}>
          <option value="">Filter by Group</option>
          {[...new Set(zones.map(z => z.brand.group))].map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Zone</th>
            <th>Brand</th>
            <th>Company</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredZones.map((z, index) => (
            <tr key={z.id}>
              <td>{index + 1}</td>
              <td>{z.name}</td>
              <td>{z.brand.name}</td>
              <td>{z.brand.company}</td>
              <td>{z.brand.group}</td>
              <td>
                <button onClick={() => handleEdit(z)} style={{ marginRight: "5px", background: "#ffc107", border: "none", padding: "5px 10px" }}>Edit</button>
                <button onClick={() => handleDelete(z.id)} style={{ background: "#dc3545", color: "#fff", border: "none", padding: "5px 10px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
