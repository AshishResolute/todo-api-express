import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
function verifyToken(req,res,next)
{
    let authHeaders = req.get('Authorization');
    if(!authHeaders) return res.status(401).json({error:` Token cannot be recieved`});
    const token = authHeaders.split(' ')[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({err:`Invalid Token`});
         req.user = decoded;
    next()
    });
   
}

export default verifyToken;