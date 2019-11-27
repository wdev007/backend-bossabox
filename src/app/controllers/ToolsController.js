/* eslint-disable consistent-return */
import Tool from "../models/Tool";

class ToolController {
  async index(req, res) {
    try {
      const { tag } = req.query;

      if (!tag) {
        const tools = await Tool.find({});

        return res.json(tools);
      }

      const tools = await Tool.find({ tags: tag });

      if (!tools.length) {
        return res.json({ message: "Tool not exist" });
      }

      return res.status(200).json(tools);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const { title, description, link, tags } = req.body;

      const tool = await Tool.create({
        title,
        description,
        link,
        tags
      });

      return res.status(201).json({ message: "Created", tool });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const tool = await Tool.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
      });

      if (!tool) {
        return res.status(404).json({ message: "Tool not exist" });
      }

      return res.json(tool);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const tool = await Tool.findByIdAndDelete(id);

      if (!tool) {
        return res.status(404).json({ message: "Tool does not exist" });
      }
      return res.status(204).json({ message: "No Content", toolId: id });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new ToolController();
