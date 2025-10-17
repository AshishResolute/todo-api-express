import express from 'express';
import db from './db.js';
import verifyToken from './verifyToken.js';
const router = express.Router();

router.post('/',verifyToken,async(req,res)=>{
    try{
        let {task_Id,task} = req.body;
        let user_Id = req.user.id;
        await db.query('insert into tasks (task_Id,task,user_Id) values(?,?,?)',[task_Id,task,user_Id]);
        res.status(200).json(`Task ${task} with Id ${task_Id} added`);
    }
    catch(err)
    {
        res.json({Error:`DataBase Error`,err:err.message});
    }
});

export default router;