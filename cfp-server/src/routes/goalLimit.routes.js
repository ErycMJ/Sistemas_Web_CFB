import express from "express"
import {
  addGoalLimit,
  getAllGoalLimits,
  updateGoalLimit,
  deleteGoalLimit,
} from "../Controllers/goalLimit.controller.js"
import { isAuthenticated } from "../Middlewares/auth.js"

const router = express.Router()

router.post("/goals-limits", isAuthenticated, addGoalLimit)

router.get("/goals-limits", isAuthenticated, getAllGoalLimits)

router.put("/goals-limits/:id", isAuthenticated, updateGoalLimit)

router.delete("/goals-limits/:id", isAuthenticated, deleteGoalLimit)

export default router
