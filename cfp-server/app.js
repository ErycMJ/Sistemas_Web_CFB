import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import userRoutes from "./src/Routes/user.route.js"
import categoryRoutes from "./src/Routes/category.route.js"
import transactionRoutes from "./src/Routes/transaction.route.js"
import { errorMiddleware } from "./src/Middlewares/error.js"
import path from "path"
import { fileURLToPath } from "url"
import chatRoutes from "./src/Routes/chat.routes.js"
import goalLimiRoutes from "./src/Routes/goalLimit.routes.js"


const app = express()
dotenv.config()

const PORT = Number(process.env.PORT) || 5000
const allowedOrigins = ["http://localhost:5173", "https://pinvent-app.vercel.app"]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error("Not allowed by CORS"))
    },
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/transaction", transactionRoutes)
app.use("/chat", chatRoutes)
app.use("/meta", goalLimiRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Expense_Tracker",
  })
  .then(() => {
    console.log("Connected to Database")
  })
  .catch((err) => {
    console.log(`Some error occured while connecting to database: ${err}`)
  })

app.use(errorMiddleware)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set a different PORT in environment variables.`)
    process.exit(1)
  }

  console.error("Failed to start server:", error)
  process.exit(1)
})

export default app
