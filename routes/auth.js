import express from 'express';
import bycrypt from 'bcrypt';
import db from './db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        if(!email||!password) return res.status(401).json(`Enter email and Password`);
        // find the user from the users table
        let [rows] = await db.query('select * from users where email=?',[email]);
        let user = rows[0];
        // now compare password using bycrypt.compare(password1,password2);
        let match = await bycrypt.compare(password,user.password);
        if(!match) return res.status(401).json({Err:`Passwords didnt match`});

        // generate token]
        const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({message:`Login successfull`,token});
    }
    catch (error) {
        res.status(500).json({error:`Login error`,details:error.message});
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