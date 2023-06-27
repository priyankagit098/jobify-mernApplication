import { StatusCodes } from "http-status-codes"


const checkPermissions= (requestUser, resourceUserId, req, res) => {
    if (requestUser.userId === resourceUserId.toString()) {
        return req.status(StatusCodes.UNAUTHORIZED).json({msg: "Not authorized to access this route"})
    }

}


export default checkPermissions