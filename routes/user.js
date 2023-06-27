import express from "express";
const router= express.Router();
import rateLimiter from "express-rate-limit";
import { register, login,updateUser,getCurrentUser,logout } from "../controllers/user.js";



const apiLimiter= rateLimiter({
    windowMs: 15*60*1000,    
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",

})



import authMiddleware from "../middleware/authMiddleware.js";
import testUser from "../middleware/testUser.js";

router.route('/register').post(apiLimiter,register)
router.route('/login-create').post(apiLimiter,login);
router.route('/logout').get(logout)
router.route('/update').patch(authMiddleware, testUser,updateUser)
router.route('/getCurrentUser').get(authMiddleware, getCurrentUser)











export default router;