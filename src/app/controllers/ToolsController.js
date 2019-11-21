import Tool from "../models/Tool";

class ToolController {
  async index(req, res) {
    const { tag } = req.query;

    if (!tag) {
      const tools = await Tool.find({});

      return res.json(tools);
    }

    const tools = await Tool.find({ tags: tag });

    if (!tools.length) {
      return res.json({ message: "Tool not exist" });
    }

    return res.json(tools);
  }

  async store(req, res) {
    const { title, description, link, tags } = req.body;

    await Tool.create({
      title,
      description,
      link,
      tags
    });

    return res.status(201).json({ message: "Created" });
  }

  async update(req, res) {
    const { id } = req.params;

    const tool = await Tool.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });

    if (!tool) {
      return res.status(404).json({ message: "Tool not exist" });
    }

    return res.json(tool);
  }

  async delete(req, res) {
    const { id } = req.params;

    const tool = await Tool.findByIdAndDelete(id);

    if (!tool) {
      return res.json({ message: "Tool does not exist" });
    }
    return res.status(204).json({ message: "No Content" });
  }
}

export default new ToolController();
