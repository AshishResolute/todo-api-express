import express from 'express'
import db from './db.js';
import verifyToken from './verifyToken.js';
const router = express.Router();

router.get('/',verifyToken,async(req,res)=>{
    try{
         let user_Id = parseInt(req.user.id);
         const [tasks] = await db.query(`select * from tasks where user_Id=? `,[user_Id]);
         if(!tasks.length) return res.status(200).json({message:`No Tasks Found`});
         res.status(200).json(tasks);
    }
    catch(err)
    {
        res.status(500).json({Error:`DataBase error`,err:err.message});
    }
});

export default router;