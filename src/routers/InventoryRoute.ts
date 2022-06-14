import { Router } from 'express';

import InventoryController from '../controllers/InventoryController';

class InventoryRoute {
    private router: Router;

    constructor() {
        this.router = Router();
        this.setupRouter();
    }

    private setupRouter() {
        this.router.get('/inventory', async (req, res) => {
            await InventoryController.getInventory(req, res);
        });
        this.router.post('/inventory', async (req, res) => {
            await InventoryController.addInventory(req, res);
        });
        this.router.put('/inventory', async (req, res) => {
            await InventoryController.updateInventory(req, res);
        });
        this.router.delete('/inventory', async (req, res) => {
            await InventoryController.deleteInventory(req, res);
        });
        this.router.post('/comment', async (req, res) => {
            await InventoryController.deleteComment(req, res);
        });
        this.router.post('/undocomment', async (req, res) => {
            await InventoryController.undoDeletionComment(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new InventoryRoute();