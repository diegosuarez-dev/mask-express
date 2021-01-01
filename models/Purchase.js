const mongoose = require('mongoose');
const Address = require('./Address');
const User = require('./User');

const Product = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
});

const PurchaseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    seller_id: {
      type: String,
    },
    products: [Product],
    subtotal: Number,
    total: Number,
    deliveryAddress: {
      type: Address,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

PurchaseSchema.pre('save', async function (next) {
  let calculatedSubtotal = 0;
  let calculatedTotal = 0;
  const purchase = this;
  purchase.products.forEach((element) => {
    calculatedSubtotal += element.price * element.units;
    calculatedTotal += element.price * element.units * 1.04;
  });
  purchase.subtotal = calculatedSubtotal;
  purchase.total = calculatedTotal;
  //If no delivery address is sent, user address is default value
  if (!purchase.deliveryAddress) {
    const user = await User.findById(purchase.user_id);
    purchase.deliveryAddress = user.address;
  }
  next();
});

PurchaseSchema.pre('updateOne', function (next) {
  let updatedSubtotal = 0;
  let updatedTotal = 0;
  const purchase = this;
  this._update.products.forEach((element) => {
    updatedSubtotal += element.price * element.units;
    updatedTotal += element.price * element.units * 1.04;
  });
  purchase._update.subtotal = updatedSubtotal;
  purchase._update.total = updatedTotal;
  next();
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;
