const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const Category = require("../models/Category");

router.get("/getAll", CategoryController.getAllCategory);
router.post(
    "/create",
    body("name").custom(async (value) => {
        return await Category.findOne({ name: value }).then((category) => {
            if (category) {
                Promise.reject(`Tên danh mục đã tồn tại`);
            }
        });
    }),
    CategoryController.createCategory
);
router.get("/getBySlug", CategoryController.getCategoryBySlug);
router.put("/:id/update", CategoryController.updateCategory);
router.delete("/:id", CategoryController.destroyCategory);

module.exports = router;
