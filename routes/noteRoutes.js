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
        const notes = await Note.findAll();
        res.status(200).json({
            message: "Notes retrieved successfully",
            notes,
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
