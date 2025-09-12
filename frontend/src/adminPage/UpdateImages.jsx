"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ClothManager() {
  const [form, setForm] = useState({
    target: "type",
    action: "add",
    type: "",
    newType: "",
  });

  const [sampleImage, setSampleImage] = useState(null);
  const [images, setImages] = useState([]);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("target", form.target);
      formData.append("action", form.action);
      formData.append("type", form.type);
      if (form.newType) formData.append("newType", form.newType);

      if (sampleImage) {
        formData.append("sampleImage", sampleImage);
      }

      if (images.length > 0) {
        for (let img of images) {
          formData.append("images", img);
        }
      }

      const res = await axios.post(
        "http://localhost:5000/api/cloth/manage-type",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResponse(res.data);
    } catch (err) {
      setResponse(err.response?.data || { message: "Error occurred" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cloth Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        {/* Target */}
        <div>
          <label className="block font-semibold">Target</label>
          <select
            name="target"
            value={form.target}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="type">Type</option>
            <option value="sampleImage">Sample Image</option>
            <option value="images">Images</option>
          </select>
        </div>

        {/* Action */}
        <div>
          <label className="block font-semibold">Action</label>
          <select
            name="action"
            value={form.action}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            {form.target === "type" && (
              <>
                <option value="add">Add</option>
                <option value="remove">Remove</option>
                <option value="rename">Rename</option>
              </>
            )}
            {form.target === "sampleImage" && (
              <>
                <option value="add">Add</option>
                <option value="update">Update</option>
                <option value="remove">Remove</option>
              </>
            )}
            {form.target === "images" && (
              <>
                <option value="add">Add</option>
                <option value="removeOne">Remove One</option>
                <option value="removeAll">Remove All</option>
              </>
            )}
          </select>
        </div>

        {/* Type field */}
        <div>
          <label className="block font-semibold">Type Name</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="e.g. Shirt"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* New type for rename */}
        {form.target === "type" && form.action === "rename" && (
          <div>
            <label className="block font-semibold">New Type</label>
            <input
              type="text"
              name="newType"
              value={form.newType}
              onChange={handleChange}
              placeholder="e.g. T-Shirt"
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        {/* Sample Image Upload */}
        {(form.target === "type" || form.target === "sampleImage") &&
          form.action !== "remove" && (
            <div>
              <label className="block font-semibold">Sample Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSampleImage(e.target.files[0])}
                className="border p-2 rounded w-full"
              />
            </div>
          )}

        {/* Images Upload */}
        {(form.target === "type" || form.target === "images") &&
          form.action === "add" && (
            <div>
              <label className="block font-semibold">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages([...e.target.files])}
                className="border p-2 rounded w-full"
              />
            </div>
          )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold">Response:</h2>
          <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
