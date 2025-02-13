const express = require("express");
const path = require("path");
const Task = require("./Models/task");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended : true }))
app.use(express.json());


// Home Route - Fetch and Render Tasks
app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render("index", { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching tasks");
    }
});

// Create Task
app.post("/create", async (req, res) => {
    try {
        const { title, details } = req.body;
        const newTask = new Task({ name: title, details });
        await newTask.save();
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating task");
    }
});

// Edit Task
app.post("/edit", async (req, res) => {
    try {
        const { originalTitle, newTitle, newDetails } = req.body;

        // Update the task by finding it via its original name
        await Task.findOneAndUpdate(
            { name: originalTitle },
            { name: newTitle, details: newDetails }
        );

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating task");
    }
});

// Delete Task
app.post("/delete", async (req, res) => {
    try {
        const { title } = req.body;
        await Task.findOneAndDelete({ name: title });
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting task");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
