import { GoalLimit } from "../Models/goalLimit.model.js"
import { catchAsyncError } from "../Middlewares/catchAsyncError.js"
import ErrorHandler from "../Middlewares/error.js"

export const addGoalLimit = catchAsyncError(async (req, res, next) => {
  const { goal, limit } = req.body
  const createdBy = req.user.id

  if (!goal || !limit) {
    return next(new ErrorHandler("Por favor, preencha todos os campos.", 400))
  }

  const newGoalLimit = await GoalLimit.create({
    goal,
    limit,
    createdBy,
  })

  res.status(201).json({
    success: true,
    message: "Meta e Limite adicionados com sucesso",
    goalLimit: newGoalLimit,
  })
})

export const getAllGoalLimits = catchAsyncError(async (req, res, next) => {
  const goalLimits = await GoalLimit.find({ createdBy: req.user.id })

  res.status(200).json({
    success: true,
    goalLimits,
  })
})

export const updateGoalLimit = catchAsyncError(async (req, res, next) => {
  const { goal, limit } = req.body
  const { id } = req.params

  if (!goal || !limit) {
    return next(new ErrorHandler("Por favor, preencha todos os campos.", 400))
  }

  let goalLimit = await GoalLimit.findById(id)
  if (!goalLimit) {
    return next(new ErrorHandler("Meta ou limite não encontrado.", 404))
  }

  goalLimit = await GoalLimit.findByIdAndUpdate(
    id,
    { goal, limit },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    success: true,
    message: "Meta e Limite atualizados com sucesso",
    goalLimit,
  })
})

export const deleteGoalLimit = catchAsyncError(async (req, res, next) => {
  const { id } = req.params

  const goalLimit = await GoalLimit.findById(id)
  if (!goalLimit) {
    return next(new ErrorHandler("Meta ou limite não encontrado.", 404))
  }

  await goalLimit.remove()

  res.status(200).json({
    success: true,
    message: "Meta e Limite excluídos com sucesso",
  })
})
