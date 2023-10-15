"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)("recipes", recipeSchema);
