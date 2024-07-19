import mongoose from 'mongoose'

const orderedProductSchema = new mongoose.Schema({
  product_id: {
     type: mongoose.Schema.Types.ObjectId, ref: 'products' ,
     required: true
  },
  quantity: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('orderedProduct', orderedProductSchema);
