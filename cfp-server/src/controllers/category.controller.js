import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { Category } from "../Models/category.model.js";

export const addCategory = catchAsyncError(async (req, res, next) => {
    const { categoryName, categoryType } = req.body;
    const userId = req.user.id;
    if(!categoryName || !categoryType){
        return next(new ErrorHandler("Please fill full registration form", 400));
    }

    if (!['income', 'expense'].includes(categoryType)) {
        return next(new ErrorHandler("Invalid category type", 400));
    }

    const normalizedName = categoryName.trim();
    if (!normalizedName) {
        return next(new ErrorHandler("Category name is required", 400));
    }

    const existingCategory = await Category.findOne({
        createdBy: userId,
        categoryType,
        categoryName: { $regex: `^${normalizedName}$`, $options: 'i' }
    });

    if (existingCategory) {
        return next(new ErrorHandler("Category already exists", 409));
    }

    const newCategory = await Category.create({
        categoryName: normalizedName, categoryType, createdBy:userId
    });
    res.status(200).json({
        success: true,
        message: "New Category Added",
        newCategory
    });
});

export const getCategories = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const adminId = process.env.ADMIN_ID;

    const categories = await Category.find({
        $or: [
            { createdBy: userId },
            { createdBy: adminId }
        ]
    }).sort({ categoryType: 1, categoryName: 1 });
    res.status(200).json(categories);
});

export const updateCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { categoryName, categoryType } = req.body;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }
    const userId = req.user.id;
    if(category.createdBy.toString() !== userId){
        return next(new ErrorHandler("You are not authorized to update this category", 403));
    }

    if (!categoryName || !categoryType) {
        return next(new ErrorHandler("Category name and type are required", 400));
    }

    const normalizedName = categoryName.trim();
    if (!normalizedName) {
        return next(new ErrorHandler("Category name is required", 400));
    }

    if (!['income', 'expense'].includes(categoryType)) {
        return next(new ErrorHandler("Invalid category type", 400));
    }

    const duplicated = await Category.findOne({
        _id: { $ne: id },
        createdBy: userId,
        categoryType,
        categoryName: { $regex: `^${normalizedName}$`, $options: 'i' }
    });

    if (duplicated) {
        return next(new ErrorHandler("Category already exists", 409));
    }

    category.categoryName = normalizedName;
    category.categoryType = categoryType;
    await category.save();
    res.status(200).json({
        message: 'Category updated successfully',
        category 
    });
});

export const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }
    const userId = req.user.id;
    if(category.createdBy.toString() !== userId){
        return next(new ErrorHandler("You are not authorized to update this category", 403));
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({ 
        message: 'Category deleted successfully' 
    });
});
