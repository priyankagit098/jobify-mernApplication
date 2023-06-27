import { StatusCodes } from "http-status-codes"


const testUser=(req, res, next) => {
    if (req.user.testUser) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Test User, Read Only!"})
    }

    next()

};

export default testUser