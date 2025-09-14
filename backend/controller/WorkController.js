import Work from "../model/Work.js";

// ✅ Get all works
export const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create new work
export const createWork = async (req, res) => {
  try {
    const { type } = req.body;
    const relativePath = req.file ? `uploads/${req.file.filename}` : null;

    const newWork = new Work({
      type,
      sampleImage: relativePath,
      items: [],
    });

    await newWork.save();
    res.json(newWork);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update work type/sampleImage
export const updateWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });

    work.type = req.body.type || work.type;
    if (req.file) {
      work.sampleImage = `uploads/${req.file.filename}`;
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
    await Work.findByIdAndDelete(req.params.workId);
    res.json({ message: "Work deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add new item
export const addItemToWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });

    const { title, description } = req.body;
    const relativePath = req.file ? `uploads/${req.file.filename}` : null;

    const newItem = {
      title,
      description,
      image: relativePath,
    };

    work.items.push(newItem);
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

    item.title = req.body.title || item.title;
    item.description = req.body.description || item.description;

    if (req.file) {
      item.image = `uploads/${req.file.filename}`;
    }

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

    work.items = work.items.filter(
      (i) => i._id.toString() !== req.params.itemId
    );

    await work.save();
    res.json(work);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
