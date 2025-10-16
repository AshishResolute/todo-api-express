import express from 'express';
import bycrypt from 'bcrypt';
import db from './db.js';
const router = express.Router();
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        const hashedPassword = await bycrypt.hash(password, 10);
        console.log(email, password);
        res.json({ email, password })
    }
    catch (err) {
        res.status(500).json({ Error: 'form Error', err: err.message });
    }

});
router.post('/sign-up', async (req, res) => {
    try {
        let { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) return res.json({ Error: `In-sufficient Deatils` });
        if(password!==confirmPassword) return res.status(300).json(`Passwords doesnt match`);
        let hashedPassword = await bycrypt.hash(password,10)
         await db.query('insert into users (email,password) values(?,?)',[email,hashedPassword]);
        res.status(200).json({ email, password, confirmPassword });
        console.log(req.body);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
})

router.delete('/delete-user/:email',async(req,res)=>{
    try{
           let email = req.params.email;
           if(!email) return res.status(300).json({Email:`Enter Your Email`});
           await db.query('delete from users where email=?',[email]);
           res.status(200).json(`User Deleted `);
    }
    catch(err)
    {
        res.status(500).json({Error:`DataBase error`, err: err.message });   
    }
})
export default router;