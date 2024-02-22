import express from 'express';
import models from './models.js';
const router = express.Router();


// --- Menu Item Routes ---
router.get('/menu-items', async (req, res) => {
    try {
        const menuItems = await models.MenuItems.getAll();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/menu-items/:id', async (req, res) => {
    try {
        const menuItem = await models.MenuItems.getById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/menu-items', async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newMenuItem = await models.MenuItems.create(name, description, price, category);
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

router.put('/menu-items/:id', async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const updatedMenuItem = await models.MenuItems.update(req.params.id, name, description, price, category);
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedMenuItem); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/menu-items/:id', async (req, res) => {
    try {
        // Check if a menu item exists before deleting (optional)
        const existingMenuItem = await models.MenuItems.getById(req.params.id);
        if (!existingMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' }); 
        }

        await models.MenuItems.delete(req.params.id);
        res.status(204).send(); // 204 No Content - successful deletion
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Order Routes --- 
router.get('/orders', async (req, res) => {
    try {
        const orders = await models.Order.getAll(); // Assuming you want to fetch all orders (add filters/queries if needed)
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/orders/:id', async (req, res) => {
    try {
        const order = await models.Order.getById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/orders', async (req, res) => {
    try {
        const { tableId, waiterId } = req.body;
        const newOrder = await models.Order.create(tableId, waiterId);
        res.status(201).json(newOrder); 
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

router.put('/orders/:id', async (req, res) => {
    try {
        const { tableId, waiterId, status, totalAmount } = req.body; // Extract parameters as needed
        const updatedOrder = await models.Order.update(req.params.id, tableId, waiterId, status, totalAmount); // Define an 'update' method in your Order model 
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/orders/:id', async (req, res) => {
    try {
        const existingOrder = await models.Order.getById(req.params.id);
        if (!existingOrder) {
            return res.status(404).json({ message: 'Order not found' }); 
        }
        await models.Order.delete(req.params.id); // Make a 'delete' method in your Order model
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Order Item Routes --- 
router.get('/orders/:orderId/items', async (req, res) => {
    try {
        const orderItems = await models.OrderItems.getAllByOrderId(req.params.orderId);
        res.json(orderItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/orders/:orderId/items', async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const newOrderItem = await models.OrderItems.create(req.params.orderId, menuItemId, quantity);
        res.status(201).json(newOrderItem);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

router.put('/orders/:orderId/items/:itemId', async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const updatedOrderItem = await models.OrderItems.update(req.params.itemId, req.params.orderId, menuItemId, quantity);
        if (!updatedOrderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.json(updatedOrderItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/orders/:orderId/items/:itemId', async (req, res) => {
    try {
        await models.OrderItems.delete(req.params.itemId);
        res.status(204).send(); // 204 indicates successful deletion 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.get('/tables', async (req, res) => {
    try {
        const tables = await models.Table.getAll(); // Assuming a 'getAll' method in your Table model
        res.json(tables);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/tables/:id', async (req, res) => {
    try {
        const tableId = parseInt(req.params.id, 10) +1 ;
        const table = await models.Table.getById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.json(table);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // Generic for client
    }
});

router.put('/tables/:id', async (req, res) => {
    try {
        const { status } = req.body; 
        const updatedTable = await models.Table.updateStatus(req.params.id, status);
        if (!updatedTable) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.json(updatedTable); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
