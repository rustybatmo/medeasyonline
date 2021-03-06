const { Schema, model } = require('mongoose')

const cartSchema = new Schema(
	{
    coupon: {
      type: { type: String },
      name: { type: String },
      value: { type: Number }
    },
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'product',
					required: true
				},
				name: String,
				attributes: {
					type: {
						dosage: { type: String, required: true },
						quantity: { type: String, required: true }
					},
					required: true
				},
				image: String,
				price: String,
				quantity: Number,
				subTotal: String
			}
		]
	},
	{ timestamps: true }
)

cartSchema.methods = {
	toJSON: function() {
		const cart = this.toObject()
		delete cart.__v
		return cart
	}
}

const Cart = model('cart', cartSchema)
module.exports = Cart
