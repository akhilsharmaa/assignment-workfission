import express, { Express, Request, Response, Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

const router = express.Router();

router.post("/new", async (req: Request, res: Response): Promise<void> => { 
    const { name, price, description, imageUrl } = req.body; 
    try {

        const product_db = await prisma.product.create({
            data: {
                name,
                price,
                description,
                imageUrl
            }
        })
        res.status(StatusCodes.OK).send(product_db);
    } catch (e) {
        console.error(e);
        res.status(StatusCodes.BAD_REQUEST).send("Something Went wrong");
    }

});

router.get("/all", async (req: Request, res: Response): Promise<void> => { 
    try {
        const product_db = await prisma.product.findMany()
        res.status(StatusCodes.OK).send(product_db);
    } catch (e) {
        console.error(e);
        res.status(StatusCodes.BAD_REQUEST).send("Something Went wrong");
    }
}); 

router.delete("/delete", async (req: Request, res: Response): Promise<void> => { 
    const { id } = req.body;
    try {
        const product_db = await prisma.product.delete({
            where: {id: id}
        })
        res.status(StatusCodes.OK).send(product_db);
    } catch (e) {
        console.error(e);
        res.status(StatusCodes.BAD_REQUEST).send("Something Went wrong");
    }
}); 

export default router; 