import express from 'express';
import addTasks from './addTask.js';
import getTasks from './task.js';
import findTasks from './findTask.js';
import deleteTaks from './deleteTask.js';
const app = express();
const PORT =3000;
app.use(express.json());
app.use('/task',getTasks);
app.use('/addTask',addTasks);
app.use('/findTasks',findTasks);
app.use('/delete',deleteTaks);
app.listen(PORT,()=>{
   console.log(`Server running at port ${PORT}`);
})