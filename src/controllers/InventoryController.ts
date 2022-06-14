
import { Request, Response } from "express";
import Product from "../db/inventory";
import db from "../db/db";
import sqldb from "sqlite3orm";


class InventoryController {
    async getInventory(req: Request<{}, any, any, {}, Record<string, any>>, res: Response) {
        let productDao = new sqldb.BaseDAO(Product, db);

        let allProducts = await productDao.selectAll();

        res.send(allProducts);
    }

    async addInventory(req: Request<{}, any, any, {}, Record<string, any>>, res: Response) {
        let productDao = new sqldb.BaseDAO(Product, db);

        let product = new Product();

        product.name = req.body.name;
        product.details = req.body.details;
        product.price = req.body.price;
        product.comments = { comments: req.body.comments, deleted: new Array(req.body.comments).fill(false) };

        await productDao.insert(product);

        return res.send(200);
    }

    async updateInventory(req: Request<{}, any, any, {}, Record<string, any>>, res: Response) {
        let productDao = new sqldb.BaseDAO(Product, db);

        productDao.selectById(req.body.id);

        let product = new Product();

        product.name = req.body.name;
        product.details = req.body.details;
        product.price = req.body.price;

        await productDao.update(product);

        return res.send(200);
    }

    async deleteInventory(req: Request<{}, any, any, {}, Record<string, any>>, res: Response) {
        let productDao = new sqldb.BaseDAO(Product, db);

        await productDao.deleteById(req.body.id);

        return res.send(200);
    }

    async deleteComment(req: Request<{}, any, any, {}, Record<string, any>>, res: Response) {
        let productDao = new sqldb.BaseDAO(Product, db);

        let product: Product = await productDao.selectById(req.body.id);

        product.comments.deleted[req.body.index] = true;

        await productDao.update(product);
        return res.send(200);
    }

    async undoDeletionComment(req: Request<{}, any, any, {}, Record<string, any>>, res: Response) {
        let productDao = new sqldb.BaseDAO(Product, db);

        let product: Product = await productDao.selectById(req.body.id);

        product.comments.deleted[req.body.index] = true;

        await productDao.update(product);
        return res.send(200);
    }
}

export default new InventoryController();