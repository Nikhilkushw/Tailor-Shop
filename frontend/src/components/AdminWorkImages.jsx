"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api/work-images";
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function AdminWorkImages() {
  const [works, setWorks] = useState([]);
  const [newWork, setNewWork] = useState({
    type: "",
    sampleImage: null,
    preview: null,
  });
  const [editingWork, setEditingWork] = useState(null);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image: null,
    preview: null,
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  // 🔹 Fetch all works
  const fetchWorks = async () => {
    try {
      const res = await axios.get(API);
      setWorks(res.data);
    } catch (err) {
      console.error("❌ Error fetching works:", err);
    }
  };

  // 🔹 Cloudinary Upload
  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("❌ Cloudinary Upload Error:", err);
      return null;
    }
  };

  // ----------------- WORK CRUD -----------------

  const handleWorkChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewWork({
        ...newWork,
        [name]: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setNewWork({ ...newWork, [name]: value });
    }
  };

  const handleAddWork = async (e) => {
    e.preventDefault();

    if (!newWork.type || !newWork.sampleImage) {
      console.log("⚠️ Missing type or sampleImage");
      return;
    }

    console.log(
      "🚀 Adding work with type:",
      newWork.type,
      "and sampleImage (File):",
      newWork.sampleImage
    );

    try {
      // Upload to Cloudinary
      const cloudUrl = await uploadToCloudinary(newWork.sampleImage);

      console.log("☁️ Cloudinary returned URL:", cloudUrl);

      if (!cloudUrl) {
        console.log("❌ Cloudinary upload failed, no URL returned");
        return;
      }

      // ✅ Send to backend (sampleImage key match karega backend se)
      const payload = { type: newWork.type, sampleImage: cloudUrl };
      console.log("📤 Final Payload sending to backend:", payload);

      const response = await axios.post(
        "http://localhost:5000/api/work-images",
        { type: newWork.type, sampleImage: cloudUrl },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(
        "✅ Work added successfully, backend response:",
        response.data
      );

      // Reset form
      setNewWork({ type: "", sampleImage: null, preview: null });
      fetchWorks();
    } catch (err) {
      console.error("❌ Error adding work:", err);
    }
  };

  const handleUpdateWork = async (e) => {
    e.preventDefault();
    try {
      let cloudUrl = editingWork.sampleImage;
      if (editingWork.sampleImage instanceof File) {
        cloudUrl = await uploadToCloudinary(editingWork.sampleImage);
      }

      await axios.put(`${API}/${editingWork._id}`, {
        type: editingWork.type,
        sampleImage: cloudUrl,
      });

      setEditingWork(null);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error updating work:", err);
    }
  };

  const handleDeleteWork = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error deleting work:", err);
    }
  };

  // ----------------- ITEM CRUD -----------------

  const handleItemChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewItem({
        ...newItem,
        [name]: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleAddItem = async (workId) => {
    try {
      const cloudUrl = newItem.image
        ? await uploadToCloudinary(newItem.image)
        : null;
      console.log("🚀 Adding item to work:", workId, "with data:", {
        title: newItem.title,
        description: newItem.description,
        image: cloudUrl,
      }); // debug
      await axios.post(`http://localhost:5000/api/work-images/${workId}/items`, {
        title: newItem.title,
        description: newItem.description,
        image: cloudUrl,
      });
      setNewItem({ title: "", description: "", image: null, preview: null });
      fetchWorks();
    } catch (err) {
      console.error("❌ Error adding item:", err);
    }
  };

  const handleUpdateItem = async (workId, e) => {
    e.preventDefault();
    try {
      let cloudUrl = editingItem.image;
      if (editingItem.image instanceof File) {
        cloudUrl = await uploadToCloudinary(editingItem.image);
      }

      await axios.put(`${API}/${workId}/items/${editingItem._id}`, {
        title: editingItem.title,
        description: editingItem.description,
        image: cloudUrl,
      });

      setEditingItem(null);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error updating item:", err);
    }
  };

  const handleDeleteItem = async (workId, itemId) => {
    try {
      await axios.delete(`${API}/${workId}/items/${itemId}`);
      fetchWorks();
    } catch (err) {
      console.error("❌ Error deleting item:", err);
    }
  };

  // ----------------- UI -----------------
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🧵 Admin — Manage Works</h1>

      {/* ➕ Add Work */}
      <form
        onSubmit={handleAddWork}
        className="mb-8 flex gap-3 items-center flex-wrap"
      >
        <input
          type="text"
          name="type"
          value={newWork.type}
          onChange={handleWorkChange}
          placeholder="Enter work type"
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          name="sampleImage"
          accept="image/*"
          onChange={handleWorkChange}
        />
        {newWork.preview && (
          <img
            src={newWork.preview}
            alt="preview"
            className="h-16 w-24 object-cover rounded"
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Work
        </button>
      </form>

      {/* 📋 Work List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <motion.div
            key={work._id}
            className="border p-4 rounded-lg bg-white shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Work Edit */}
            {editingWork?._id === work._id ? (
              <form onSubmit={handleUpdateWork} className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editingWork.type}
                  onChange={(e) =>
                    setEditingWork({ ...editingWork, type: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setEditingWork({
                      ...editingWork,
                      sampleImage: e.target.files[0],
                    })
                  }
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingWork(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="font-semibold text-lg">{work.type}</h2>
                {work.sampleImage && (
                  <img
                    src={work.sampleImage}
                    alt={work.type}
                    className="h-32 w-full object-cover mt-2 rounded"
                  />
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setEditingWork(work)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteWork(work._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

            {/* Items Section */}
            <div className="mt-4">
              <h3 className="font-semibold">Items:</h3>
              {work.items?.map((item) => (
                <div key={item._id} className="border rounded p-2 mt-2">
                  {editingItem?._id === item._id ? (
                    <form
                      onSubmit={(e) => handleUpdateItem(work._id, e)}
                      className="flex flex-col gap-2"
                    >
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            title: e.target.value,
                          })
                        }
                        className="border p-2 rounded"
                      />
                      <textarea
                        value={editingItem.description}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            description: e.target.value,
                          })
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            image: e.target.files[0],
                          })
                        }
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p>{item.description}</p>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-24 w-full object-cover mt-2 rounded"
                        />
                      )}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(work._id, item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Add Item Form */}
              <div className="mt-3">
                <input
                  type="text"
                  name="title"
                  value={newItem.title}
                  onChange={handleItemChange}
                  placeholder="Item title"
                  className="border p-2 rounded mb-2 w-full"
                />
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleItemChange}
                  placeholder="Item description"
                  className="border p-2 rounded mb-2 w-full"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleItemChange}
                />
                {newItem.preview && (
                  <img
                    src={newItem.preview}
                    alt="preview"
                    className="h-16 w-24 object-cover rounded mt-2"
                  />
                )}
                <button
                  onClick={() => handleAddItem(work._id)}
                  className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 transition"
                >
                  Add Item
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
