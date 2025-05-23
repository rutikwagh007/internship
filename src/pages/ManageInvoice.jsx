"use client"

import { useState } from "react"
import "./ManageInvoice.css"
import { FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ManageInvoice = () => {
    const navigate = useNavigate()
    const [invoices, setInvoices] = useState([
        {
            id: 1,
            invoiceNo: "INV-1134",
            estimateId: "23",
            chainId: "2912",
            companyName: "Delta Tech Pvt Ltd",
            serviceProvided: "Maintenance of Propeller Shaft",
            amount: 5000,
            date: "14-12-2024",
            email: "delta@example.com",
        },
        {
            id: 2,
            invoiceNo: "INV-1135",
            estimateId: "24",
            chainId: "2913",
            companyName: "Acme Corp",
            serviceProvided: "Battery Maintenance",
            amount: 6000,
            date: "15-12-2024",
            email: "acme@example.com",
        },
        {
            id: 3,
            invoiceNo: "INV-1136",
            estimateId: "25",
            chainId: "2914",
            companyName: "Tech Solutions",
            serviceProvided: "Engine Servicing",
            amount: 4800,
            date: "16-12-2024",
            email: "tech@example.com",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [invoiceToDelete, setInvoiceToDelete] = useState(null)

    const filteredInvoices = invoices.filter(
        (invoice) =>
            invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.estimateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.chainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleEdit = (id) => {
        window.location.href = `/update-invoice/${id}`
    }

    const handleDelete = (id) => {
        setInvoiceToDelete(id)
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        setInvoices(invoices.filter((invoice) => invoice.id !== invoiceToDelete))
        setShowDeleteModal(false)
        setInvoiceToDelete(null)
    }




    return (
        <div className="manage-invoice-container">
            <div className="header">
                <h2>Manage Invoices</h2>

                <button
                    onClick={() => navigate('/generate-invoice')}
                    className="generate-button"
                >
                    Generate Invoice
                </button>


                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by invoice no, estimate id, chain id or company name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="invoice-summary">
                <div className="total-invoice-card">
                    <div className="icon-container">
                        <FileText size={28} />
                    </div>
                    <div>
                        <p className="card-title">Total Invoices</p>
                        <p className="card-count">{filteredInvoices.length}</p>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Invoice No</th>
                            <th>Estimate ID</th>
                            <th>Chain ID</th>
                            <th>Company Name</th>
                            <th>Service Provided</th>
                            <th>Amount (Rs)</th>
                            <th>Date</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.invoiceNo}</td>
                                <td>{invoice.estimateId}</td>
                                <td>{invoice.chainId}</td>
                                <td>{invoice.companyName}</td>
                                <td>{invoice.serviceProvided}</td>
                                <td>{invoice.amount}</td>
                                <td>{invoice.date}</td>
                                <td>{invoice.email}</td>
                                <td className="action-buttons">
                                    <button className="edit-button" onClick={() => handleEdit(invoice.id)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(invoice.id)}>
                                        Delete
                                    </button>

                                    <button className="edit-button" onClick={() => handleEdit(invoice.id)}>
                                        Edit
                                    </button>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Delete Invoice</h3>
                        <p>Are you sure you want to delete this invoice? This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className="confirm-button" onClick={confirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageInvoice
