module.exports = app => {
    const tasks = require("../controllers/task.controller.js")

    var router = require("express").Router();

    // Create new Task
    router.post("/", tasks.create);

    // Retrieve all Tasks
    router.get("/", tasks.findAll);

    // Retrieve single tutorial with id
    router.get("/:id", tasks.findOne);

    // Update a task with id
    router.put("/:id", tasks.update);

    // Delete a task with id
    router.delete("/:id", tasks.delete);

    // Delete all stored tasks from database
    router.delete("/", tasks.deleteAll);

    app.use('/api/tasks', router);
};