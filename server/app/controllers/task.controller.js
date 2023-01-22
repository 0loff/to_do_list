const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and save new task
exports.create = (req, res) => {

    if (!req.body || !req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const task = {
        title: req.body.title,
        description: req.body.description,
        isDone: req.body.isDone ? req.body.isDone : false
    }

    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Task."
            })
        });
}

// Retrieve all tasks from database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Task.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tasks."
            });
        });
}

// Find a single task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            if (data) {
                res
                    .status(200)
                    .send(data);

            } else {
                res.status(400).send({
                    message: `Cannot find task with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            });
        });
}

// Update a task by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update task with id=${id}. Maby Task was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            })
        })
}

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete task with id=" + id
            })
        })
}

// Delete all tasks from the database
exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Tasks deleted successfully!`
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all tasks"
            });
        });
}
