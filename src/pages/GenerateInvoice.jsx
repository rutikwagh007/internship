
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GenerateInvoice() {
  const [estimateId, setEstimateId] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  
  const estimates = [
    { id: '23', service: 'Maintenance of Propeller Shaft', amount: 5000 },
    { id: '24', service: 'Battery Maintenance', amount: 6000 },
    { id: '25', service: 'Engine Servicing', amount: 4800 },
  ];

  const handleGenerateInvoice = () => {
    const selectedEstimate = estimates.find((estimate) => estimate.id === estimateId);

    if (selectedEstimate) {
      const invoice = {
        invoiceNo: `INV-${Math.floor(Math.random() * 10000)}`,
        estimateId: selectedEstimate.id,
        serviceProvided: selectedEstimate.service,
        amount: selectedEstimate.amount,
        date: new Date().toLocaleDateString(),
      };

      // Save the invoice (in your actual app, make an API call to save)
      setInvoiceData(invoice);

      // Navigate to the invoice details page (or wherever you want to show the invoice)
      navigate('/manage-invoices');
    } else {
      alert('Please select a valid estimate.');
    }
  };

  return (
    <div className="generate-invoice-container">
      <h2>Generate Invoice</h2>

      <label htmlFor="estimateId">Select Estimate ID</label>
      <select
        id="estimateId"
        value={estimateId}
        onChange={(e) => setEstimateId(e.target.value)}
      >
        <option value="">Select an Estimate</option>
        {estimates.map((estimate) => (
          <option key={estimate.id} value={estimate.id}>
            {estimate.service} (Amount: Rs {estimate.amount})
          </option>
        ))}
      </select>

      <button onClick={handleGenerateInvoice}>Generate Invoice</button>

      {invoiceData && (
        <div className="invoice-preview">
          <h3>Invoice Preview</h3>
          <p><strong>Invoice No:</strong> {invoiceData.invoiceNo}</p>
          <p><strong>Estimate ID:</strong> {invoiceData.estimateId}</p>
          <p><strong>Service Provided:</strong> {invoiceData.serviceProvided}</p>
          <p><strong>Amount:</strong> Rs {invoiceData.amount}</p>
          <p><strong>Date:</strong> {invoiceData.date}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateInvoice;
