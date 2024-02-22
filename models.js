import pool from './db.js'; 

class MenuItems {
    constructor(id, name, description, price, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    // Get all menu items
    static async getAll() {
        const result = await pool.query('SELECT * FROM menu_items');
        return result.rows; 
    }

    // Get a menu item by ID
    static async getById(id) {
        const result = await pool.query('SELECT * FROM menu_items WHERE id = $1', [parseInt(id,10)]);
        return result.rows[0]; // Assumes single item matching the ID
    }

    // Create a new menu item
    static async create(name, description, price, category) {
        const result = await pool.query(
            'INSERT INTO menu_items (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, category]
        );
        return result.rows[0];
    }

    // Update a menu item
    static async update(id, name, description, price, category) {
        const result = await pool.query(
            'UPDATE menu_items SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *',
            [name, description, price, category, id]
        );
        return result.rows[0];
    }

    // Delete a menu item
    static async delete(id) {
        await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
    }
}

class OrderItems {
    constructor(id, order_id, menu_item_id, quantity) {
        this.id = id;
        this.order_id = order_id;
        this.menu_item_id = menu_item_id;
        this.quantity = quantity;
    }

    static async getAllByOrderId(orderId) {
        const result = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
        return result.rows; 
    }

    static async create(orderId, menuItemId, quantity) {
        const result = await pool.query(
            'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [orderId, menuItemId, quantity] 
        );
        return result.rows[0];
    }

    static async update(id, orderId, menuItemId, quantity) {
        const result = await pool.query(
            'UPDATE order_items SET order_id = $1, menu_item_id = $2, quantity = $3 WHERE id = $4 RETURNING *',
            [orderId, menuItemId, quantity, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM order_items WHERE id = $1', [id]);
    }
}

// --- Orders Model --- 
class Order {
    constructor(id, tableId, orderTime, status, totalAmount, waiterId) {
      this.id = id;
      this.tableId = tableId;
      this.orderTime = orderTime;
      this.status = status;
      this.totalAmount = totalAmount;
      this.waiterId = waiterId;
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create(tableId, waiterId) {
        const result = await pool.query(
            'INSERT INTO orders (table_id, waiter_id) VALUES ($1, $2) RETURNING *',
            [tableId, waiterId] 
        );
        return result.rows[0];
    }

    static async updateStatus(id, status) {
        const result = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, id] 
        );
        return result.rows[0];
    }

    //  ... (Add more methods as needed)
}

// --- Optional Tables Model ---
class Table {
    constructor(id, status, capacity) {
      this.id = id;
      this.status = status;
      this.capacity = capacity;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM tables');
        return result.rows; 
    }
    
    static async getById(id) {
        const result = await pool.query('SELECT * FROM tables WHERE id = $1', [id]);
        return result.rows[0]; // Return the first row, assuming ID is unique
    }

    static async updateStatus(id, status) {
        const result = await pool.query(
            'UPDATE tables SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        return result.rows[0]; // Return the updated table (optional)
    }
}

const models = {
    MenuItems,
    OrderItems,
    Order,
    Table
};

export default models; // Export all models
