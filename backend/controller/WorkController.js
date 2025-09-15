import Work from "../model/Work.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Extract Cloudinary public_id from secure_url
const extractPublicId = (secureUrl) => {
  if (!secureUrl) return null;
  try {
    const parts = secureUrl.split("/upload/");
    if (parts.length < 2) return null;
    let after = parts[1].replace(/^v\d+\//, ""); // remove version
    return after.replace(/\.[a-zA-Z0-9]+$/, ""); // remove extension
  } catch {
    return null;
  }
};

// ✅ Get all works
export const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create work
export const createWork = async (req, res) => {
  try {
    console.log("📩 Raw Request Body:", req.body);

    const { type, sampleImage } = req.body;
    console.log("📩 Parsed type:", type, "sampleImage:", sampleImage);

    if (!type) {
      console.log("⚠️ Type missing in request");
      return res.status(400).json({ message: "Type is required" });
    }

    // ✅ Create new document
    const newWork = new Work({
      type,
      sampleImage: sampleImage || null,
      items: [],
    });

    await newWork.save();

    console.log("✅ Work saved in DB:", newWork);

    res.status(201).json(newWork);
  } catch (err) {
    console.error("❌ Error creating work:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update work
export const updateWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });

    work.type = req.body.type ?? work.type;
    if (req.body.sampleImage) {
      work.sampleImage = req.body.sampleImage;
    }

    await work.save();
    res.json(work);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete work
export const deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });

    if (work.sampleImage) {
      const publicId = extractPublicId(work.sampleImage);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    for (let item of work.items) {
      if (item.image) {
        const publicId = extractPublicId(item.image);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
    }

    await work.deleteOne();
    res.json({ message: "Work deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add item
export const addItemToWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });

    const { title, description, image } = req.body;
    work.items.push({ title, description, image: image || null });

    await work.save();
    res.json(work);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Edit item
export const editItem = async (req, res) => {
  try {
    const work = await Work.findById(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });

    const item = work.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.title = req.body.title ?? item.title;
    item.description = req.body.description ?? item.description;
    if (req.body.image) item.image = req.body.image;

    await work.save();
    res.json(work);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete item
export const deleteItem = async (req, res) => {
  try {
    const work = await Work.findById(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });

    const item = work.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.image) {
      const publicId = extractPublicId(item.image);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    work.items = work.items.filter(
      (i) => i._id.toString() !== req.params.itemId
    );
    await work.save();

    res.json(work);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
