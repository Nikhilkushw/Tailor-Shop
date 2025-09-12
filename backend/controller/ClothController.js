import Cloth from "../model/Cloth.js";

export const updateClothTypes = async (req, res) => {
  try {
    const { action, target, type, newType, image } = req.body;

    let sampleImage = req.files?.sampleImage
      ? `/uploads/${req.files.sampleImage[0].filename}`
      : undefined;

    let images = req.files?.images
      ? req.files.images.map((f) => `/uploads/${f.filename}`)
      : [];

    let updatedCloth;

    switch (target) {
      case "type":
        if (action === "add") {
          // check if type already exists
          const existing = await Cloth.findOne({ "Type.type": type });

          if (existing) {
            // update existing type instead of creating duplicate
            const updateQuery = {};

            if (sampleImage) {
              updateQuery["Type.$.sampleImage"] = sampleImage;
            }
            if (images.length) {
              updateQuery["Type.$.images"] = {
                $each: images,
              };
            }

            updatedCloth = await Cloth.findOneAndUpdate(
              { "Type.type": type },
              {
                ...(sampleImage && { $set: { "Type.$.sampleImage": sampleImage } }),
                ...(images.length && { $addToSet: { "Type.$.images": { $each: images } } }),
              },
              { new: true }
            );
          } else {
            // create new
            updatedCloth = await Cloth.findOneAndUpdate(
              {},
              { $push: { Type: { type, sampleImage, images } } },
              { new: true, upsert: true }
            );
          }
        } else if (action === "remove") {
          updatedCloth = await Cloth.findOneAndUpdate(
            {},
            { $pull: { Type: { type } } },
            { new: true }
          );
        } else if (action === "rename") {
          updatedCloth = await Cloth.findOneAndUpdate(
            { "Type.type": type },
            { $set: { "Type.$.type": newType } },
            { new: true }
          );
        }
        break;

      case "sampleImage":
        if ((action === "add" || action === "update") && sampleImage) {
          updatedCloth = await Cloth.findOneAndUpdate(
            { "Type.type": type },
            { $set: { "Type.$.sampleImage": sampleImage } },
            { new: true }
          );
        } else if (action === "remove") {
          updatedCloth = await Cloth.findOneAndUpdate(
            { "Type.type": type },
            { $unset: { "Type.$.sampleImage": "" } },
            { new: true }
          );
        }
        break;

      case "images":
        if (action === "add" && images.length) {
          updatedCloth = await Cloth.findOneAndUpdate(
            { "Type.type": type },
            { $addToSet: { "Type.$.images": { $each: images } } },
            { new: true }
          );
        } else if (action === "removeOne") {
          updatedCloth = await Cloth.findOneAndUpdate(
            { "Type.type": type },
            { $pull: { "Type.$.images": image } },
            { new: true }
          );
        } else if (action === "removeAll") {
          updatedCloth = await Cloth.findOneAndUpdate(
            { "Type.type": type },
            { $set: { "Type.$.images": [] } },
            { new: true }
          );
        }
        break;

      default:
        return res.status(400).json({ message: "Invalid target" });
    }

    if (!updatedCloth) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({
      message: `${target} ${action} successful`,
      cloth: updatedCloth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGallery = async (req, res) => {
  const { type } = req.query; // ✅ use query for GET
  try {
    const cloth = await Cloth.findOne({ "Type.type": type });

    if (!cloth) {
      return res.status(404).json({ message: "Type not found" });
    }

    // find the specific type object
    const gallery = cloth.Type.find((t) => t.type === type);

    res.status(200).json(gallery || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
