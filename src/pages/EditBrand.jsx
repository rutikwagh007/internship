import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function EditBrand({ brands, setBrands, chains }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const brandId = parseInt(id)
  const brand = brands.find((b) => b.id === brandId)

  const [name, setName] = useState("")
  const [chainId, setChainId] = useState("")

  useEffect(() => {
    if (brand) {
      setName(brand.name)
      setChainId(brand.chainId)
    }
  }, [brand])

  const handleUpdate = (e) => {
    e.preventDefault()

    const updatedBrand = {
      ...brand,
      name,
      chainId,
    }

    const updatedBrands = brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b))
    setBrands(updatedBrands)
    localStorage.setItem("brands", JSON.stringify(updatedBrands))

    navigate("/manage-brand")
  }

  if (!brand) return <p>Brand not found.</p>

  return (
    <div className="edit-brand">
      <h2>Edit Brand</h2>
      <form onSubmit={handleUpdate} className="form">
        <div>
          <label>Brand Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Chain</label>
          <select value={chainId} onChange={(e) => setChainId(Number(e.target.value))} required>
            <option value="">Select a Chain</option>
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.company}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn update-btn">Update</button>
      </form>
    </div>
  )
}

export default EditBrand
