const express = require("express");
const router = express.Router();
const { Note } = require("../models");

router.post("/", async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const sortBy = req.query.sortBy || "newest";

        let order;
        switch (sortBy) {
            case "newest":
                order = [["createdAt", "DESC"]];
                break;
            case "oldest":
                order = [["createdAt", "ASC"]];
                break;
            case "title-a-z":
                order = [["title", "ASC"]];
                break;
            case "title-z-a":
                order = [["title", "DESC"]];
                break;
            default:
                order = [["createdAt", "DESC"]];
        }

        const { count, rows: notes } = await Note.findAndCountAll({
            offset: offset,
            limit: limit,
            order: order,
        });

        const totalPages = Math.ceil(count / limit);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;

        if (notes.length === 0) {
            return res.status(200).json({
                message: "No notes found",
                notes: [],
                page,
                limit,
                totalPages,
                hasPreviousPage,
                hasNextPage,
            });
        }

        res.status(200).json({
            message: "Notes retrieved successfully",
            notes,
            page,
            limit,
            totalPages,
            hasPreviousPage,
            hasNextPage,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (note) {
            res.status(200).json({
                message: "Note retrieved successfully",
                note,
            });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (note) {
            await note.update(req.body);
            res.status(200).json({
                message: "Note updated successfully",
                note,
            });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (note) {
            await note.destroy();
            res.status(204).json({ message: "Note deleted successfully" });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
