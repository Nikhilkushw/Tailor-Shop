import WorkImage from "../model/Work.js";

// Get all
export const getWorkImages = async (req, res) => {
  try {
    const works = await WorkImage.find();
    res.json(works);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create
export const createWorkImage = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    if (req.files.sampleImage) {
      data.sampleImage = req.files.sampleImage[0].path;
    }
    if (req.files.items) {
      data.items = data.items.map((item, i) => ({
        ...item,
        image: req.files.items[i].path,
      }));
    }
    const work = new WorkImage(data);
    await work.save();
    res.status(201).json(work);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
export const updateWorkImage = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const work = await WorkImage.findById(req.params.id);

    if (!work) return res.status(404).json({ error: "Work not found" });

    if (req.files.sampleImage) data.sampleImage = req.files.sampleImage[0].path;
    if (req.files.items) {
      data.items = data.items.map((item, i) => ({
        ...item,
        image: req.files.items[i]?.path || item.image,
      }));
    }

    const updatedWork = await WorkImage.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json(updatedWork);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteWorkImage = async (req, res) => {
  try {
    await WorkImage.findByIdAndDelete(req.params.id);
    res.json({ message: "Work image deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
