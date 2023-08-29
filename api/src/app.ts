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

app.get('/:slug', async(req, res) => {
    const slug = String(req.params.slug)
    const link = await db.redirectLink.findFirstOrThrow({
        where: {
            slug: slug,
            enabled: true
        }
    }).catch(()=>{
        res.status(404).send()
    });
    res.send(link);
});

app.post("/",async(req,res)=>{
    const link = await db.redirectLink.create({
        data: req.body
    })
    res.send(link)
})

app.put("/",async(req,res)=>{
    const link = await db.redirectLink.update({
        data: req.body,
        where: {
            id: req.body.id
        }
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
    console.log(`Server is running on - http://localhost:${port}/`);
});