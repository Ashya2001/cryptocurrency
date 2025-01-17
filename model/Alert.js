
import mongoose from 'mongoose'


const alertSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true

    },
    currency: { 
        type: String,
         required: true
     },
    price: {
         type: Number,
          required: true,
          min: [0, 'Price must be a positive number'],
         },
    direction: {
         type: String,
          enum: ['above', 'below'], 
          required: true },
});

  const Alert= mongoose.model('Alert', alertSchema);
export default Alert;
