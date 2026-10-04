import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
// import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatINR } from '../utils/format.js';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <article className="card product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <span className="tag">{product.category}</span>
        <Link to={`/product/${product._id}`} className="product-name">{product.name}</Link>
        <div className="row-between">
          <strong>{formatINR(product.price)}</strong>
          <span className="muted">★ {product.rating.toFixed(1)}</span>
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              if (wishlisted) {
                await api.delete(`/wishlist/${product._id}`);
                setWishlisted(false);
              } else {
                await api.post(`/wishlist/${product._id}`);
                setWishlisted(true);
              }
            } catch (err) {
              console.error('Wishlist error:', err);
            }
          }}
        >
          {wishlisted ? '❤️' : '♡'}
        </button>
        <button className="btn full" disabled={outOfStock} onClick={() => addToCart(product)}>
          {outOfStock ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}
