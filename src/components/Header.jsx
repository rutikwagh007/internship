import { Link, useLocation } from "react-router-dom"
import "./Header.css"

function Header() {
  const location = useLocation()

  const getSectionTitle = () => {
    if (location.pathname.includes("/manage-invoice")) return "Manage Invoice Section"
    if (location.pathname.includes("/manage-estimate")) return "Manage Estimate Section"
    if (location.pathname.includes("/manage-subzone")) return "Manage Subzone Section"
    if (location.pathname.includes("/manage-brand")) return "Manage Brand Section"
    if (location.pathname.includes("/manage-chain")) return "Manage Chain Section"
    if (location.pathname.includes("/manage-group")) return "Manage Group Section"
    return "Dashboard"
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Invoice</h1>
        <span className="section-title">| {getSectionTitle()}</span>
      </div>
      <div className="header-right">
        <span className="user-greeting">Hi User</span>
        <Link to="/" className="logout-link">
          Logout
        </Link>
      </div>
    </header>
  )
}

export default Header