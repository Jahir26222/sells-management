import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            enum: ["Pani Puri", "Chaat"]
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        price: {
            type: Number,
            required: true
        },

        total: {
            type: Number,
            required: true
        },
        source: {
            type: String,
            enum: ["Home", "Calculator"]
        }

    },
    {
        timestamps: true
    }
);

const saleModel = mongoose.model('Sale', saleSchema);
export default saleModel;