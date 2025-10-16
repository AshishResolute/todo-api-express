import express from 'express';
import addTasks from './addTask.js';
import getTasks from './task.js';
import findTasks from './findTask.js';
import deleteTaks from './deleteTask.js';
import authAction from './auth.js';
import cors from 'cors';
const app = express();
const PORT =3000;
app.use(express.json());
app.use(cors());
app.use('/task',getTasks);
app.use('/addTask',addTasks);
app.use('/findTasks',findTasks);
app.use('/delete',deleteTaks);
app.use('/auth',authAction);
app.listen(PORT,()=>{
   console.log(`Server running at port ${PORT}`);
})