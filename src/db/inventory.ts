import { table, id, field } from 'sqlite3orm';

@table({ name: 'PRODUCT' })
class Product {
    @id({ name: 'product_id', dbtype: 'INTEGER NOT NULL' })
    product_id!: number;

    @field({ name: 'name', dbtype: 'TEXT NOT NULL' })
    name!: string;

    @field({ name: 'details', dbtype: 'TEXT', isJson: true })
    details: any;

    @field({ name: 'price', dbtype: 'INTEGER NOT NULL' })
    price!: number;

    @field({ name: 'comments', dbtype: 'TEXT', isJson: true })
    comments: any;
}

export default Product;
