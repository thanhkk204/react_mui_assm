import mongoose from 'mongoose'
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    orderedProduct: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'orderedProduct' }
    ],
  }, { timestamps: true });
  
 export default mongoose.model('cart', cartSchema);
  