import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ correct hook

const AdminDashboard = () => {
  const [contentId, setContentId] = useState(null);
  const navigate = useNavigate(); // ✅ correct usage

  const content = [
    { id: 1, title: "Services", navigatePage: "/services" },
    { id: 2, title: "Offers", navigatePage: "/offers" },
    { id: 3, title: "Work Images", navigatePage: "/work-images" },
  ];

  console.log("Selected Content ID:", contentId);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-6 mb-6 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.map((item) => (
          <div
            key={item.id}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
            <p className="text-gray-600">
              Manage {item.title.toLowerCase()} here.
            </p>
            <button
              onClick={() => {
                setContentId(item.id); // ✅ store clicked content id
                navigate(item.navigatePage);
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Go to {item.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
