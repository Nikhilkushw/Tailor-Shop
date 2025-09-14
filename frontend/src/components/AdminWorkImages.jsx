"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/work-images`;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminWorkImages() {
  
  const [works, setWorks] = useState([]);
  const [newWork, setNewWork] = useState({ type: "", sampleImage: null, preview: null });
  const [newItem, setNewItem] = useState({ title: "", description: "", image: null, preview: null, workId: null });
  const [editingWork, setEditingWork] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => { fetchWorks(); }, []);

  const fetchWorks = async () => {
    try {
      const res = await axios.get(API);
      setWorks(res.data);
    } catch (err) {
      console.error("❌ Error fetching works:", err);
    }
  };

  // Handle Work input
  const handleWorkChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewWork({ ...newWork, [name]: files[0], preview: URL.createObjectURL(files[0]) });
    } else setNewWork({ ...newWork, [name]: value });
  };

  // Add Work
  const handleAddWork = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("type", newWork.type);
      if (newWork.sampleImage) formData.append("sampleImage", newWork.sampleImage);

      await axios.post(API, formData);
      setNewWork({ type: "", sampleImage: null, preview: null });
      fetchWorks();
    } catch (err) {
      console.error("❌ Error adding work:", err);
    }
  };

  // Update Work
  const handleUpdateWork = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("type", editingWork.type);
      if (editingWork.sampleImage) formData.append("sampleImage", editingWork.sampleImage);

      await axios.put(`${API}/${editingWork._id}`, formData);
      setEditingWork(null);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error updating work:", err);
    }
  };

  // Delete Work
  const handleDeleteWork = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error deleting work:", err);
    }
  };

  // Handle Item input
  const handleItemChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewItem({ ...newItem, [name]: files[0], preview: URL.createObjectURL(files[0]) });
    } else setNewItem({ ...newItem, [name]: value });
  };

  // Add Item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.workId) return alert("⚠️ Select a work first!");
    try {
      const formData = new FormData();
      formData.append("title", newItem.title);
      formData.append("description", newItem.description);
      if (newItem.image) formData.append("image", newItem.image);

      await axios.post(`${API}/${newItem.workId}/items`, formData);
      setNewItem({ title: "", description: "", image: null, preview: null, workId: null });
      fetchWorks();
    } catch (err) {
      console.error("❌ Error adding item:", err);
    }
  };

  // Update Item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editingItem.title);
      formData.append("description", editingItem.description);
      if (editingItem.image) formData.append("image", editingItem.image);

      await axios.put(`${API}/${editingItem.workId}/items/${editingItem._id}`, formData);
      setEditingItem(null);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error updating item:", err);
    }
  };

  // Delete Item
  const handleDeleteItem = async (workId, itemId) => {
    try {
      await axios.delete(`${API}/${workId}/items/${itemId}`);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error deleting item:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🧵 Admin — Manage Works & Items</h1>

      {/* ➕ Add Work */}
      <form onSubmit={handleAddWork} className="mb-8 flex gap-3 items-center flex-wrap">
        <input type="text" name="type" value={newWork.type} onChange={handleWorkChange} placeholder="Enter work type" className="border p-2 rounded" required />
        <input type="file" name="sampleImage" accept="image/*" onChange={handleWorkChange} />
        {newWork.preview && <img src={newWork.preview} alt="preview" className="h-16 w-24 object-cover rounded" />}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add Work</button>
      </form>

      {/* ➕ Add Item */}
      <form onSubmit={handleAddItem} className="mb-8 flex flex-col gap-3 border p-4 rounded bg-gray-50">
        <select value={newItem.workId || ""} onChange={(e) => setNewItem({ ...newItem, workId: e.target.value })} className="border p-2 rounded" required>
          <option value="">Select Work</option>
          {works.map((work) => <option key={work._id} value={work._id}>{work.type}</option>)}
        </select>
        <input type="text" name="title" value={newItem.title} onChange={handleItemChange} placeholder="Item title" className="border p-2 rounded" required />
        <input type="text" name="description" value={newItem.description} onChange={handleItemChange} placeholder="Item description" className="border p-2 rounded" />
        <input type="file" name="image" accept="image/*" onChange={handleItemChange} />
        {newItem.preview && <img src={newItem.preview} alt="preview" className="h-16 w-24 object-cover rounded" />}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Add Item</button>
      </form>

      {/* 📋 Work List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <motion.div key={work._id} className="border p-4 rounded-lg bg-white shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            {editingWork?._id === work._id ? (
              <form onSubmit={handleUpdateWork} className="flex flex-col gap-2">
                <input type="text" value={editingWork.type} onChange={(e) => setEditingWork({ ...editingWork, type: e.target.value })} className="border p-2 rounded" />
                <input type="file" name="sampleImage" accept="image/*" onChange={(e) => setEditingWork({ ...editingWork, sampleImage: e.target.files[0] })} />
                <button type="submit" className="bg-yellow-500 text-white px-3 py-1 rounded">Update</button>
                <button type="button" onClick={() => setEditingWork(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              </form>
            ) : (
              <>
                <h2 className="font-semibold text-lg">{work.type}</h2>
                {work.sampleImage && <img src={`${BASE_URL}/${work.sampleImage.replace(/\\/g, "/")}`} alt={work.type} className="h-32 w-full object-cover mt-2 rounded" />}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => setEditingWork(work)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteWork(work._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </>
            )}

            {/* Items */}
            <div className="mt-4">
              <h3 className="font-semibold">Items:</h3>
              {work.items.length === 0 ? (
                <p className="text-gray-500">No items yet</p>
              ) : (
                <div className="grid gap-3 mt-2">
                  {work.items.map((item) => (
                    <motion.div key={item._id} className="border p-3 rounded bg-gray-50"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      {editingItem?._id === item._id ? (
                        <form onSubmit={handleUpdateItem} className="flex flex-col gap-2">
                          <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="border p-2 rounded" />
                          <input type="text" value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} className="border p-2 rounded" />
                          <input type="file" name="image" accept="image/*" onChange={(e) => setEditingItem({ ...editingItem, image: e.target.files[0] })} />
                          <div className="flex gap-2">
                            <button type="submit" className="bg-yellow-500 text-white px-3 py-1 rounded">Update</button>
                            <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm">{item.description}</p>
                          {item.image && <img src={`${BASE_URL}/${item.image.replace(/\\/g, "/")}`} alt={item.title} className="h-20 w-full object-cover mt-2 rounded" />}
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => setEditingItem({ ...item, workId: work._id })} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                            <button onClick={() => handleDeleteItem(work._id, item._id)} className="bg-red-400 text-white px-3 py-1 rounded">Delete</button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
