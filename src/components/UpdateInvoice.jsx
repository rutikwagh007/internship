import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    id: "",
    invoiceNo: "",
    estimateId: "",
    chainId: "",
    companyName: "",
    serviceProvided: "",
    amount: "",
    date: "",
    email: "",
  });

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const existingInvoice = storedInvoices.find((inv) => inv.id === id);

    if (existingInvoice) {
      setInvoice(existingInvoice);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const updatedInvoices = storedInvoices.map((inv) =>
      inv.id === invoice.id ? invoice : inv
    );

    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    navigate("/manage-invoices");
  };

  return (
    <div>
      <h2>Update Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Invoice No:</label>
          <input type="text" name="invoiceNo" value={invoice.invoiceNo} onChange={handleChange} />
        </div>
        <div>
          <label>Estimate ID:</label>
          <input type="text" name="estimateId" value={invoice.estimateId} onChange={handleChange} />
        </div>
        <div>
          <label>Chain ID:</label>
          <input type="text" name="chainId" value={invoice.chainId} onChange={handleChange} />
        </div>
        <div>
          <label>Company Name:</label>
          <input type="text" name="companyName" value={invoice.companyName} onChange={handleChange} />
        </div>
        <div>
          <label>Service Provided:</label>
          <input type="text" name="serviceProvided" value={invoice.serviceProvided} onChange={handleChange} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" name="amount" value={invoice.amount} onChange={handleChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={invoice.date} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={invoice.email} onChange={handleChange} />
        </div>
        <button type="submit">Update Invoice</button>
      </form>
    </div>
  );
};

export default UpdateInvoice;
