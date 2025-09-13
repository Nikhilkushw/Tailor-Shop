import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/work-images";

const AdminWorkImages = () => {
  const [works, setWorks] = useState([]);
  const [newWork, setNewWork] = useState({ type: "", sampleImage: null });

  const [newItem, setNewItem] = useState({ title: "", description: "", image: null });
  const [editItemData, setEditItemData] = useState(null);

  // ✅ Fetch works
  const fetchWorks = async () => {
    const res = await axios.get(API);
    setWorks(res.data);
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // ✅ Create work
  const handleAddWork = async () => {
    const data = new FormData();
    data.append("type", newWork.type);
    if (newWork.sampleImage) data.append("sampleImage", newWork.sampleImage);

    await axios.post(API, data);
    setNewWork({ type: "", sampleImage: null });
    fetchWorks();
  };

  // ✅ Delete work
  const handleDeleteWork = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchWorks();
  };

  // ✅ Add item
  const handleAddItem = async (workId) => {
    const data = new FormData();
    data.append("title", newItem.title);
    data.append("description", newItem.description);
    if (newItem.image) data.append("image", newItem.image);

    await axios.post(`${API}/${workId}/items`, data);
    setNewItem({ title: "", description: "", image: null });
    fetchWorks();
  };

  // ✅ Edit item
  const handleEditItem = async (workId) => {
    const data = new FormData();
    data.append("title", editItemData.title);
    data.append("description", editItemData.description);
    if (editItemData.image) data.append("image", editItemData.image);

    await axios.put(`${API}/${workId}/items/${editItemData._id}`, data);
    setEditItemData(null);
    fetchWorks();
  };

  // ✅ Delete item
  const handleDeleteItem = async (workId, itemId) => {
    await axios.delete(`${API}/${workId}/items/${itemId}`);
    fetchWorks();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Work Images</h2>

      {/* Add Work */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Add New Work</h3>
        <input
          type="text"
          placeholder="Type"
          value={newWork.type}
          onChange={(e) => setNewWork({ ...newWork, type: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="file"
          onChange={(e) =>
            setNewWork({ ...newWork, sampleImage: e.target.files[0] })
          }
        />
        <button
          onClick={handleAddWork}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Work
        </button>
      </div>

      {/* Work List */}
      {works.map((work) => (
        <div key={work._id} className="p-4 mb-6 border rounded bg-white">
          <h3 className="font-bold">{work.type}</h3>
          {work.sampleImage && (
            <img
              src={`http://localhost:5000/${work.sampleImage}`}
              alt="sample"
              className="w-32 h-32 object-cover my-2"
            />
          )}
          <button
            onClick={() => handleDeleteWork(work._id)}
            className="bg-red-500 text-white px-3 py-1 rounded mb-4"
          >
            Delete Work
          </button>

          {/* Add Item */}
          <div className="mt-4">
            <h4 className="font-semibold">Add Item</h4>
            <input
              type="text"
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="border p-1 mr-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              className="border p-1 mr-2"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewItem({ ...newItem, image: e.target.files[0] })
              }
            />
            <button
              onClick={() => handleAddItem(work._id)}
              className="ml-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Add Item
            </button>
          </div>

          {/* Items List */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Items</h4>
            {work.items.map((item) => (
              <div key={item._id} className="p-2 border mb-2 rounded">
                {editItemData && editItemData._id === item._id ? (
                  <>
                    <input
                      type="text"
                      value={editItemData.title}
                      onChange={(e) =>
                        setEditItemData({
                          ...editItemData,
                          title: e.target.value,
                        })
                      }
                      className="border p-1 mr-2"
                    />
                    <input
                      type="text"
                      value={editItemData.description}
                      onChange={(e) =>
                        setEditItemData({
                          ...editItemData,
                          description: e.target.value,
                        })
                      }
                      className="border p-1 mr-2"
                    />
                    <input
                      type="file"
                      onChange={(e) =>
                        setEditItemData({
                          ...editItemData,
                          image: e.target.files[0],
                        })
                      }
                    />
                    <button
                      onClick={() => handleEditItem(work._id)}
                      className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="font-semibold">{item.title}</h5>
                    <p>{item.description}</p>
                    {item.image && (
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        alt={item.title}
                        className="w-32 h-32 object-cover my-2"
                      />
                    )}
                    <button
                      onClick={() => setEditItemData(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(work._id, item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminWorkImages;
