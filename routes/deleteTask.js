import express from 'express';
import db from './db.js';
const router = express.Router();

router.delete('/:task',async(req,res)=>{
    try{
          let task = req.params.task;
          await db.query(`delete from tasks where task=?`,[task]);
          res.status(200).json(`Task Deleted successfully`);
    }
    catch(err)
    {
        res.status(500).json({Error:`DataBase error`,err:err.message});
    }
});

export default router;