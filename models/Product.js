const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      maxlength: 30,
      unique: true,
    },
    description: {
      type: String,
      maxlength: 300,
    },
    category: {
      type: String,
      enum: ['adults', 'kids'],
      required: true,
    },
    type: {
      type: String,
      enum: ['disposable', 'reusable'],
      required: true,
    },
    protection_level: {
      type: String,
      enum: ['hygienic', 'surgical', 'FFP2', 'with_filter', '3_layers'],
      default: 'hygienic',
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold_units: {
      type: Number,
      default: 0,
    },
    seller_id: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

ProductSchema.virtual('stock-value').get(function () {
  return this.price * this.stock;
});

ProductSchema.virtual('sales-value').get(function () {
  return this.price * this.sold_units;
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
