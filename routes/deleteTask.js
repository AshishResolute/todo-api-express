import express from 'express';
import db from './db.js';
import verifyToken  from './verifyToken.js';
const router = express.Router();

// router.delete('/:task',async(req,res)=>{
//     try{
//           let task = req.params.task;
//           await db.query(`delete from tasks where task=?`,[task]);
//           res.status(200).json(`Task Deleted successfully`);
//     }
//     catch(err)
//     {
//         res.status(500).json({Error:`DataBase error`,err:err.message});
//     }
// });
router.delete('/deleteTask',verifyToken,async(req,res)=>{
    try{
        let {task}=req.body;
        let user_id = req.user.id;
        await db.query('delete from tasks  where task=? and user_Id=?',[task,user_id]);
        res.status(200).json({Message:`Task ${task} deleted`});
    }
    catch(error)
    {
        res.status(500).json({Error:`DataBase Error`,error:error.message});
    }
})
export default router;