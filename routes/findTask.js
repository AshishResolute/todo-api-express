import express from 'express'
import db from './db.js';
const router = express.Router();

router.get('/:id/:task',async(req,res)=>{
    try{
         let id = parseInt(req.params.id);
         let task = req.params.task;
         const [tasks] = await db.query(`select * from tasks where task_id=? and task=?`,[id,task]);
         if(!tasks.length) return res.status(200).json(`Task ${task} not found`);
         res.status(200).json(tasks);
    }
    catch(err)
    {
        res.status(500).json({Error:`DataBase error`,err:err.message});
    }
});

export default router;