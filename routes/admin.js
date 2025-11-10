function checkAdmin(req,res,next)
{
    let role = req.user.role;
    if(role!=='admin') return res.status(403).json({Message:'Access Denied Admins only'});
    next();
}
export default checkAdmin;