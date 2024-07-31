import mongoose from 'mongoose'

const checkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orderedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'orderedProduct' ,
            required: true
        },
    ]
}, { timestamps: true });

export default mongoose.model('checkout', checkoutSchema);
