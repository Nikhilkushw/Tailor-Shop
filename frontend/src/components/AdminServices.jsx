import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ heading: "", description: "" });
  const [editingService, setEditingService] = useState(null);

  // 🔹 Fetch services from backend
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
      alert("Failed to fetch services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 🔹 Add new service
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/services", newService);
      setServices([...services, res.data]); // update local state
      setNewService({ heading: "", description: "" }); // clear form
    } catch (err) {
      console.error("Error adding service:", err);
      alert("Failed to add service");
    }
  };

  // 🔹 Update service
  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/services/${editingService._id}`,
        editingService
      );

      setServices(
        services.map((s) => (s._id === editingService._id ? res.data : s))
      );
      setEditingService(null); // clear edit mode
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Failed to update service");
    }
  };

  // 🔹 Delete service
  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Services</h1>

      {/* Add New Service Form */}
      <form
        onSubmit={handleAddService}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
        <input
          type="text"
          placeholder="Heading"
          value={newService.heading}
          onChange={(e) =>
            setNewService({ ...newService, heading: e.target.value })
          }
          required
          className="border w-full p-2 rounded mb-4"
        />
        <textarea
          placeholder="Description"
          value={newService.description}
          onChange={(e) =>
            setNewService({ ...newService, description: e.target.value })
          }
          required
          className="border w-full p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Service
        </button>
      </form>

      {/* List of Services */}
      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="p-6 border rounded-lg shadow bg-gray-50"
          >
            {editingService?._id === service._id ? (
              // 🔹 Edit Form
              <form onSubmit={handleUpdateService}>
                <input
                  type="text"
                  value={editingService.heading}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      heading: e.target.value,
                    })
                  }
                  className="border w-full p-2 rounded mb-3"
                />
                <textarea
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  className="border w-full p-2 rounded mb-3"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </form>
            ) : (
              // 🔹 Normal Display
              <>
                <h2 className="text-xl font-semibold">{service.heading}</h2>
                <p className="text-gray-700">{service.description}</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setEditingService(service)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
