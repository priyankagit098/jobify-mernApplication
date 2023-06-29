import express from "express"
const app = express();


import morgan from "morgan";
import "express-async-errors";

import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";


import authMiddleware from "./middleware/authMiddleware.js";

import notFoundMiddleware from "./middleware/notFound.js";
import jobsRouter from "./routes/jobsRoutes.js";



import user from "./routes/user.js";
dotenv.config();


const __dirname= dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, "./client/build")))


app.use(express.json({extended: true,  limit: "50mb" }));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
// to secure headers
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())



const port = process.env.PORT || 5000;


if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}



// routers

app.use("/api/v1/user", user);
app.use("/api/v1/jobs",authMiddleware ,jobsRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})
 

// if any route doesn't match =middlewares 
app.use(notFoundMiddleware)




const  start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=> {
            console.log(`Server started on port ${port}`);
        })
    
    } catch (error) {
        console.log(error);
    }
}

start()
