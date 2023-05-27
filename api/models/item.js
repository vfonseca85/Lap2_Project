const db = require('../database/connect');

class Item {

    constructor({ item_id, title, content, price }) {
        this.id = item_id;
        this.title = title;
        this.content = content;
        this.price = price;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM item");
        return response.rows.map(p => new Item(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM item WHERE item_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate Item.")
        }
        return new Item(response.rows[0]);
    }

    static async create(data) {
        const { title, content, price} = data;
        let response = await db.query("INSERT INTO item (title, content, price) VALUES ($1, $2, $3) RETURNING item_id;",
            [title, content, price]);
        const newId = response.rows[0].item_id;
        const newItem = await Item.getOneById(newId);
        return newItem;
    }

    async updateItem(data){
        const {title, content, price} = data;
        const response = await db.query("UPDATE item SET (title, content, price) = ($1, $2, $3) WHERE item_id = $4 RETURNING *;", [title, content, price, this.id]);
        if(response.rows.length != 1){
            throw new Error("Not able to update the item")
        }
        return new Item(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM item WHERE item_id = $1 RETURNING *;", [this.id]);
        return new Item(response.rows[0]);
    }

}

module.exports = Item;
