import Job from "../models/jobs.js";
import {StatusCodes} from "http-status-codes"
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";


const createJob = async (req, res) => {
const {position, company}= req.body;

if (!position ||!company) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide all values"})
}
try {
    req.body.createdBy= req.user.userId
    const job = await Job.create(req.body)
    res.status(200).json({job, msg: "New Job Created"})
   
}
catch(error) {
    res.status(500).json({msg: "Internal error"})
}

}


const deleteJob = async (req, res) => {
    const {id: jobId}= req.params
   
    try {
    
        const job = await Job.findOne({_id: jobId})
        if (!job) {
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No job with ${jobId}`})
        }
    
    
       checkPermissions(req.user.userId, job.createdBy)
        const deleteJob = await Job.findOneAndDelete({_id: jobId})
        res.status(StatusCodes.OK).json({msg: 'Success! Job removed'})
    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong"})
    }
    
    

}

const getAllJobs = async (req, res) => {
    const {status, search, jobType, sort}=req.query
    


    const queryObject = {
        createdBy: req.user.userId,
     } 
    //  console.log(queryObject)
    
    
    //  based on condition
     if(status !=="all") {
        queryObject.status=status;
     }
     
    if (jobType !=="all") {
        queryObject.jobType=jobType;
    }
    
    if (search) {
        queryObject.position= {$regex : search, $options: "i"};
    }
 
    console.log(queryObject)


try {


    
    let result = Job.find(queryObject)
    


if (sort ==="latest") {
    // descending .sort(fieldname)
    result=result.sort("-createdAt")
}
if (sort ==="oldest") {
    result= result.sort("createdAt")
}

if (sort ==="a-z") {
    result=result.sort("position")
}
if (sort ==="z-a") {
    result= result.sort("-position")
}

const page= Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10 ;
   

const skip = (page-1)*limit;

  

//   const jobs=   await result

result = result.skip(skip).limit(limit);

const jobs = await result;

const totalJobs = await Job.countDocuments(queryObject);
const numOfPages = Math.ceil(totalJobs / limit);


    res.status(StatusCodes.OK).json({jobs, totalJobs, numOfPages})
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong"})
}

}

const updateJob = async (req, res) => {
    
const {id: jobId}= req.params
const {company, position} = req.body
// if (!position || !company) {
//    return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide all values"})
// }
try {

    const job = await Job.findOne({_id: jobId})
    if (!job) {
    return res.status(StatusCodes.NOT_FOUND).json({msg: `No job with ${jobId}`})
    }


   checkPermissions(req.user.userId, job.createdBy)
    const updatedJob = await Job.findOneAndUpdate({_id: jobId} ,req.body)
    res.status(StatusCodes.OK).json({updatedJob})

} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong"})
}



}






const showStats = async (req, res) => {
let stats= await Job.aggregate([
    {$match : { createdBy : new mongoose.Types.ObjectId(req.user.userId)}},
    {$group : {_id : "$status", count: {$sum : 1} }},
])
stats = stats.reduce((acc, curr) => {
    const {_id: title, count}=curr
    acc[title]=count
    return acc

},{})

const defaultStats= {
    pending:stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
}

let monthlyApplications= await Job.aggregate([
    {$match : { createdBy : new mongoose.Types.ObjectId(req.user.userId)}},
    {$group : {  _id: {year: { $year: "$createdAt"},month: { $month: "$createdAt"}},
        count: {$sum : 1},

    },
   

},
{ $sort : {"_id.year": -1, "_id.month": -1}},
{ $limit : 6},
])

monthlyApplications= monthlyApplications.map((item) => {
    const {_id: {year, month}, count}= item
    const date=moment().month(month-1).year(year).format('MMM Y')
    return {
        date, count
    }
}).reverse()


res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})



}








export {createJob, deleteJob, getAllJobs, updateJob, showStats}