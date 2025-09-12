import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminWorkImages = () => {
  const [works, setWorks] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    sampleImage: null,
    samplePreview: null, // 👈 local preview ke liye
    items: [{ title: "", description: "", image: null, preview: null }],
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all works from backend
  const fetchWorks = () => {
    axios
      .get("http://localhost:5000/api/work-images")
      .then((res) => setWorks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // Handle text or file input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
        samplePreview: file ? URL.createObjectURL(file) : null,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle items inside form
  const handleItemChange = (index, e) => {
    const { name, value, type, files } = e.target;
    const newItems = [...formData.items];
    if (type === "file") {
      const file = files[0];
      newItems[index][name] = file;
      newItems[index].preview = file ? URL.createObjectURL(file) : null; // 👈 preview add
    } else {
      newItems[index][name] = value;
    }
    setFormData({ ...formData, items: newItems });
  };

  // Add new item
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { title: "", description: "", image: null, preview: null }],
    });
  };

  // Remove item
  const removeItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append(
      "data",
      JSON.stringify({
        type: formData.type,
        items: formData.items.map((i) => ({ title: i.title, description: i.description })),
      })
    );
    if (formData.sampleImage) data.append("sampleImage", formData.sampleImage);
    formData.items.forEach((item, i) => {
      if (item.image) data.append(`items`, item.image);
    });

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/work-images/${editingId}`, data);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/work-images", data);
      }
      setFormData({
        type: "",
        sampleImage: null,
        samplePreview: null,
        items: [{ title: "", description: "", image: null, preview: null }],
      });
      fetchWorks();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit work
  const handleEdit = (work) => {
    setFormData({
      type: work.type,
      sampleImage: null,
      samplePreview: work.sampleImage ? `http://localhost:5000/${work.sampleImage}` : null,
      items: work.items.map((i) => ({
        title: i.title,
        description: i.description,
        image: null,
        preview: i.image ? `http://localhost:5000/${i.image}` : null,
      })),
    });
    setEditingId(work._id);
  };

  // Delete work
  const handleDeleteWork = async (id) => {
    await axios.delete(`http://localhost:5000/api/work-images/${id}`);
    fetchWorks();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Work Images</h1>

      <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow mb-6 space-y-4">
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          className="w-full border p-2 rounded"
          required
        />
        <input type="file" name="sampleImage" onChange={handleChange} className="w-full border p-2 rounded" />
        {/* 👇 Local ya backend image preview */}
        {formData.samplePreview && (
          <img src={formData.samplePreview} alt="preview" className="w-40 h-28 object-cover rounded mt-2" />
        )}

        <h3 className="text-lg font-semibold">Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="border p-2 rounded mb-2">
            <input
              type="text"
              name="title"
              value={item.title}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Title"
              className="w-full border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Description"
              className="w-full border p-2 rounded mb-2"
              required
            />
            <input type="file" name="image" onChange={(e) => handleItemChange(index, e)} className="w-full border p-2 rounded mb-2" />
            {/* 👇 Local ya backend image preview */}
            {item.preview && (
              <img src={item.preview} alt="preview" className="w-32 h-24 object-cover rounded mt-1" />
            )}
            <button type="button" onClick={() => removeItem(index)} className="bg-red-500 text-white px-3 py-1 rounded mt-2">
              Remove Item
            </button>
          </div>
        ))}

        <button type="button" onClick={addItem} className="bg-green-500 text-white px-3 py-1 rounded">
          Add Item
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded block mt-4">
          {editingId ? "Update Work" : "Save Work"}
        </button>
      </form>

      {/* Show all saved works */}
      <div className="grid md:grid-cols-2 gap-4">
        {works.map((work) => (
          <div key={work._id} className="p-4 border rounded shadow space-y-2 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{work.type}</h2>
              <div>
                <button onClick={() => handleEdit(work)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteWork(work._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete Work
                </button>
              </div>
            </div>
            {work.sampleImage && (
              <img
                src={`http://localhost:5000/${work.sampleImage}`}
                alt={work.type}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <div>
              {work.items.map((item, i) => (
                <div key={i} className="p-2 border rounded mb-2 bg-white">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                  {item.image && (
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkImages;
