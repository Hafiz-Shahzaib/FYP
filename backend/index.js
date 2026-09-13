import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
dotenv.config();
import cors from "cors";
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
// import paymentRouter from "./route/paymentRoute.js";
import reviewRouter from "./route/reviewRoute.js";
import enrollRouter from "./route/enrollRoute.js";
import router from "./route/adminRoutes.js";
import chatRouter from "./route/chatRoute.js";
import messageRouter from "./route/messageRoute.js";

// for admin
// import adminRoutes from "./routes/adminRoutes.js";

// -------now----

const port = process.env.PORT;
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  // origin: "https://fyp-h4xq.vercel.app",
  credentials: true,
}))

 connectDb()



app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
// app.use("/api/order", paymentRouter);
app.use("/api/review", reviewRouter);
app.use('/api/course', enrollRouter)

// for chat
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

// for admin
app.use("/api/admin", router);


app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(port, () => {
  console.log("Server Started");
  connectDb();
});

// export default app;
