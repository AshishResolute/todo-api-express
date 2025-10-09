import express from 'express';
import db from './db.js';
const router = express.Router();

router.post('/',async(req,res)=>{
    try{
        let {task_Id,task} = req.body;
        await db.query('insert into tasks values(?,?)',[task_Id,task]);
        res.status(200).json(`Task ${task} with Id ${task_Id} added`);
    }
    catch(err)
    {
        res.json({Error:`DataBase Error`,err:err.message});
    }
});

export default router;