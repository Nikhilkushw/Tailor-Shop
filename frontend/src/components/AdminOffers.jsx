import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({ heading: "", description: "", validity: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const base_url = "https://tailor-shop-1.onrender.com"; // Replace with your backend URL

  // Fetch all offers
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${base_url}/api/offers`);
      setOffers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch offers. Please try again.");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Add / Update offer
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.heading.trim() || !form.description.trim() || !form.validity.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        await axios.put(`${base_url}/api/offers/${editingId}`, form);
        setEditingId(null);
        setSuccess("Offer updated successfully!");
      } else {
        await axios.post(`${base_url}/api/offers`, form);
        setSuccess("Offer added successfully!");
      }

      setForm({ heading: "", description: "", validity: "" });
      fetchOffers();
    } catch (err) {
      setError("Error saving offer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete offer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;

    try {
      await axios.delete(`${base_url}/api/offers/${id}`);
      setSuccess("Offer deleted successfully!");
      fetchOffers();
    } catch (err) {
      setError("Error deleting offer. Please try again.");
    }
  };

  // Edit offer
  const handleEdit = (offer) => {
    setForm({
      heading: offer.heading,
      description: offer.description,
      validity: offer.validity,
    });
    setEditingId(offer._id);
    setError("");
    setSuccess("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Offers</h1>

      {/* Error / Success Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Heading"
          value={form.heading}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Validity (e.g. 'Valid till 30th Sep')"
          value={form.validity}
          onChange={(e) => setForm({ ...form, validity: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : editingId ? "Update Offer" : "Add Offer"}
        </button>
      </form>

      {/* Offers List */}
      <div className="grid gap-4">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{offer.heading}</h2>
              <p className="text-gray-600">{offer.description}</p>
              <p className="text-sm text-gray-500">Validity: {offer.validity}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(offer)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(offer._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {offers.length === 0 && (
          <p className="text-gray-500 text-center">No offers available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOffers;
