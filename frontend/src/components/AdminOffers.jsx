import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({ heading: "", description: "", validity: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all offers
  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/offers");
      setOffers(res.data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Add / Update offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/offers/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/offers", form);
      }
      setForm({ heading: "", description: "", validity: "" });
      fetchOffers();
    } catch (err) {
      console.error("Error saving offer:", err);
    }
  };

  // Delete offer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/offers/${id}`);
      fetchOffers();
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };

  // Edit offer
  const handleEdit = (offer) => {
    setForm({ heading: offer.heading, description: offer.description, validity: offer.validity });
    setEditingId(offer._id);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Offers</h1>

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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingId ? "Update Offer" : "Add Offer"}
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
      </div>
    </div>
  );
};

export default AdminOffers;
