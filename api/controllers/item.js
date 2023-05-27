const Item = require('../models/item');


async function index (req, res) {
    try {
        const items = await Item.getAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Item.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const item = await Item.getOneById(id);
        res.status(200).json(item);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function update(req, res){
    
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const item = await Item.getOneById(id);
        const result = await item.updateItem(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const item = await Item.getOneById(id);
        const result = await item.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, create, show, destroy, update
}
