import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    quantity: {
      type: Number,
      required: [true, "Please Enter Your Quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Note the correct key: 'timestamps'
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
