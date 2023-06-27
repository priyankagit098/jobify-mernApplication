// for every protected route middleware logic
// getting token from req.headers from frontendpart

import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
    

// const authHeader= req.headers.authorization
// if (!authHeader || !authHeader.startsWith("Bearer")) {
//     return res.status(401).json({msg: "Authentication Invalid"})
// }

// const token = authHeader.split(" ")[1];

const token = req.cookies.token
if(!token) {
    res.status(401).json({msg: "Authentication Invalid"})
}

try {

const payload= jwt.verify(token, process.env.TOKEN_SECRET);
const testUser= payload.userId==="649acb42c73bf3f4ebf0d8f4";



req.user= {userId: payload.userId, testUser}
// from here only sending userId to other routes
next();
    
} catch (error) {
    res.status(401).json({msg: "Authentication Invalid"})
}




}

export default authMiddleware

