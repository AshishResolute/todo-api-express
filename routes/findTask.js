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
router.put('/update-status',verifyToken,async(req,res)=>{
    try{
        let user_id = req.user.id;
        let {updatedstatus,task} = req.body;
        await db.query('update tasks set status=? where user_Id=? and task=?',[updatedstatus,user_id,task]);
        res.status(200).json({message:`Status updated successfully`});
    }
    catch(error)
    {
        res.status(500).json({Error:`DataBase Error`,error:error.message});
    }
})

export default router;