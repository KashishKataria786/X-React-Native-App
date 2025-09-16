
export const Protectroute = async(req,res,next)=>{
    if(!req.auth().isAuthenticated){
        return res.status(401).json({
            message:"UnAuhtorized, You must log in!"
        })
    }
    next();
}