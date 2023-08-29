import { PrismaClient } from '@prisma/client'
import express from 'express';
import cors from 'cors';

const db = new PrismaClient()
const app: express.Application = express(); 
app.use(express.json())
app.use(cors())
const port: number = 3001;
 
app.get('/', async(_, res) => {
    const links = await db.redirectLink.findMany({
        where: {}
    })
    res.send(links);
});

app.post("/",async(req,res)=>{
    const link = await db.redirectLink.create({
        data: req.body
    })
    res.send(link)
})

app.delete("/:id",async(req,res)=>{
    const numId = Number(req.params.id)
    const link = await db.redirectLink.delete({
        where: {
            id : numId
        }
    })
    res.send(link)
})
 
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});