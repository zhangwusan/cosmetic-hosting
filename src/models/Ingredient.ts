import mongoose, { Model, Schema, Document } from "mongoose";

export interface IngredientType extends Document {
    name: string;
    description: string;
}

const IngredientSchema: Schema = new Schema<IngredientType>({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Ingredient: Model<IngredientType> = mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);

export default Ingredient;
