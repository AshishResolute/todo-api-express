import express from 'express';
import db from './db.js';
import verifyToken from './verifyToken.js'
const router = express.Router();

router.get('/',verifyToken,async(req,res)=>{
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
router.put('/by-task/:task',async(req,res)=>{
    try{
        let task = req.params.task;
        console.log(task)
        if(!task) return res.status(400).json(`Enter a task`);
        let {updateStatus} = req.body;
        await db.query('update tasks set status=? where task=?',[updateStatus,task])
        res.status(200).json(`Task Status Updated to ${updateStatus}`)
    }
    catch(err)
    {
        res.status(500).json({Error:`DataBase error`,err:err.message});
    }
})
router.get('/by-group/CompletedTasks',async(req,res)=>{
    try{
        const [tasks] = await db.query('select status,count(*) as count_task from tasks group by status having status="Done"');
        if(!tasks.length) return res.json(200).json({message:'No Tasks Found'});
        res.json({"CompletedTasks":tasks[0].count_task});
    }
    catch(err)
    {
        res.json({Error:`DataBase error`,err:err.message});
    }
})
router.get('/summary',async(req,res)=>{
    try{
        let  [summary] = await db.query('select status ,count(*) as total_tasks from tasks group by status');
        if(!summary) return res.json({message:'No tasks'});
        res.json(summary);
    }
    catch(err)
    {
        res.status(500).json({Error:'DataBase error',err:err.message});
    }
})
export default router;