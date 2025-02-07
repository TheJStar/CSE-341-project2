const mongodb = require("../db/index");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=[Contacts]
    const results = await mongodb.getDb().db().collection("contacts").find();
    results.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=[Contacts]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db().collection("contacts").find({ _id: contactId });
    results.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
    })
}

const createContact = async (req, res) => {
    //#swagger.tags=[Contacts]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const results = await mongodb.getDb().db().collection("contacts").insertOne(contact);
    if (results.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(results.error || "Something went wrong when creating a contact")
    }
}

const updateContact = async (req, res) => {
    //#swagger.tags=[Contacts]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const results = await mongodb.getDb().db().collection("contacts").replaceOne({ _id: contactId }, contact);
    if (results.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "Something went wrong when updating a contact")
    }
}

const deleteContact = async (req, res) => {
    //#swagger.tags=[Contacts]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db().collection("contacts").deleteOne({ _id: contactId }, true);
    if (results.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "Something went wrong when deleting a contact")
    }
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
}