import express from 'express';
import db from './db.js';
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
         const [tasks] = await db.query(`select * from tasks`);
         res.status(200).json(tasks);
    }
    catch(err)
    {
        res.status(500).json({Error:'DataBase Error',err:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
          let id = parseInt(req.params.id);
          if(!id) return res.status(500).json(`Enter a valid id`);
          let {updatedTask} = req.body;
          console.log(req.body);
          await db.query(`update tasks set task=? where task_Id=?`,[updatedTask,id]);
          res.json(`Task Updated Successfully`); 
    }
     catch(err)
    {
        res.status(500).json({Error:'DataBase Error',err:err.message});
    }
})

export default router;