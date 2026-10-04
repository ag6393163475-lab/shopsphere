import User from '../models/User.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/wishlist
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');

  res.json(user.wishlist);
});

// POST /api/wishlist/:productId
export const addToWishlist = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const user = await User.findById(req.user._id);

  if (!user.wishlist.includes(product._id)) {
    user.wishlist.push(product._id);
    await user.save();
  }

  res.json(user.wishlist);
});

// DELETE /api/wishlist/:productId
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== req.params.productId
  );

  await user.save();

  res.json(user.wishlist);
});