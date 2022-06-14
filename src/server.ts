
import dotenv from 'dotenv';
import db from './db/db';
import ApiApp from './ApiApp';

dotenv.config();

(async () => {
    await db.open('file:sqlite3orm?mode=memory&cache=shared')
    
    // await schema().createTable(db, 'PRODUCT');

    ApiApp.start(process.env.PORT);
})();