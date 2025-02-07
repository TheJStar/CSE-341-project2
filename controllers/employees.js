const mongodb = require("../db/index");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Employee"]
    const results = await mongodb.getDb().db().collection("employee").find();
    results.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=["Employee"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to find a employee.");
    }
    const contactId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db().collection("employee").find({ _id: contactId });
    results.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
    })
}

const createEmployee = async (req, res) => {
    //#swagger.tags=["Employee"]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        department: req.body.department,
        position: req.body.position
    };
    const results = await mongodb.getDb().db().collection("employee").insertOne(contact);
    if (results.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(results.error || "Something went wrong when creating a employee")
    }
}

const updateEmployee = async (req, res) => {
    //#swagger.tags=["Employee"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to find a employee.");
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        department: req.body.department,
        position: req.body.position
    };
    const results = await mongodb.getDb().db().collection("employee").replaceOne({ _id: contactId }, contact);
    if (results.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "Something went wrong when updating a employee")
    }
}

const deleteEmployee = async (req, res) => {
    //#swagger.tags=["Employee"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to find a employee.");
    }
    const contactId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db().collection("employee").deleteOne({ _id: contactId }, true);
    if (results.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "Something went wrong when deleting a employee")
    }
}

module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}