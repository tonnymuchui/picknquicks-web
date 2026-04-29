'use client';

import { use, useState } from 'react';
import { ProductImageGallery } from '@/components/shop/product-image-gallery';
import { ProductCard } from '@/components/shop/product-card';
import {
  Loader2,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Check,
  AlertCircle,
  Minus,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useProductBySlug } from '@/lib/product/products.queries';
import { formatPriceKsh } from '@/lib/utils/currency';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: product, isLoading } = useProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'specs' | 'reviews'>(
    'description'
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="mb-4 text-gray-600">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', { productId: product.id, quantity });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            {product.categoryName && (
              <>
                <span>/</span>
                <span className="text-gray-900">{product.categoryName}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          <div className="space-y-6">
            {product.brandName && (
              <Link
                href={`/brands/${product.brandId}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {product.brandName}
              </Link>
            )}

            <div>
              <h1 className="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">{product.name}</h1>

              {product.averageRating && product.averageRating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.round(product.averageRating!)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-bold text-gray-900">
                {formatPriceKsh(product.effectivePrice)}
              </div>
              {product.salePrice && product.salePrice < product.price && (
                <>
                  <div className="text-2xl text-gray-500 line-through">
                    {formatPriceKsh(product.price)}
                  </div>
                  <div className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700">
                    Save {discountPercentage}%
                  </div>
                </>
              )}
            </div>

            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 ${
                product.inStock
                  ? product.lowStock
                    ? 'border border-orange-200 bg-orange-50'
                    : 'border border-green-200 bg-green-50'
                  : 'border border-red-200 bg-red-50'
              }`}
            >
              {product.inStock ? (
                <>
                  <Check
                    className={product.lowStock ? 'text-orange-600' : 'text-green-600'}
                    size={20}
                  />
                  <span
                    className={`font-medium ${
                      product.lowStock ? 'text-orange-900' : 'text-green-900'
                    }`}
                  >
                    {product.lowStock ? `Only ${product.stockQuantity} left in stock` : 'In Stock'}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-red-600" size={20} />
                  <span className="font-medium text-red-900">Out of Stock</span>
                </>
              )}
            </div>

            {product.shortDescription && (
              <p className="text-lg leading-relaxed text-gray-600">{product.shortDescription}</p>
            )}

            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val >= 1 && val <= product.stockQuantity) {
                          setQuantity(val);
                        }
                      }}
                      className="w-20 border-x border-gray-300 py-3 text-center focus:outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                      className="p-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">{product.stockQuantity} available</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <ShoppingCart size={22} />
                    Add to Cart
                  </button>
                  <button className="rounded-lg border-2 border-gray-300 p-4 transition-colors hover:border-red-500 hover:text-red-500">
                    <Heart size={22} />
                  </button>
                  <button className="rounded-lg border-2 border-gray-300 p-4 transition-colors hover:border-blue-500 hover:text-blue-500">
                    <Share2 size={22} />
                  </button>
                </div>

                <button className="w-full rounded-lg border-2 border-blue-600 px-6 py-4 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50">
                  Buy Now
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Truck size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Free Delivery</div>
                  <div className="text-xs text-gray-600">Orders over KSh 50</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Warranty</div>
                  <div className="text-xs text-gray-600">1 year guarantee</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <RotateCcw size={20} className="text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Easy Returns</div>
                  <div className="text-xs text-gray-600">30 days return</div>
                </div>
              </div>
            </div>

            <div className="space-y-2 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium text-gray-900">{product.sku}</span>
              </div>
              {product.categoryName && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <Link
                    href={`/categories/${product.categoryId}`}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    {product.categoryName}
                  </Link>
                </div>
              )}
              {product.brandName && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Brand:</span>
                  <Link
                    href={`/brands/${product.brandId}`}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    {product.brandName}
                  </Link>
                </div>
              )}
              {product.weightGrams && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium text-gray-900">
                    {(product.weightGrams / 1000).toFixed(2)} kg
                  </span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium text-gray-900">{product.dimensions}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-12 rounded-lg bg-white shadow">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('description')}
                className={`px-6 py-4 font-medium transition-colors ${
                  selectedTab === 'description'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setSelectedTab('specs')}
                className={`px-6 py-4 font-medium transition-colors ${
                  selectedTab === 'specs'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-4 font-medium transition-colors ${
                  selectedTab === 'reviews'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>
          </div>

          <div className="p-6">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                {product.description ? (
                  <div className="whitespace-pre-line leading-relaxed text-gray-700">
                    {product.description}
                  </div>
                ) : (
                  <p className="text-gray-500">No description available.</p>
                )}
              </div>
            )}

            {selectedTab === 'specs' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-medium text-gray-600">SKU</span>
                    <span className="text-gray-900">{product.sku}</span>
                  </div>
                  {product.brandName && (
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <span className="font-medium text-gray-600">Brand</span>
                      <span className="text-gray-900">{product.brandName}</span>
                    </div>
                  )}
                  {product.categoryName && (
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <span className="font-medium text-gray-600">Category</span>
                      <span className="text-gray-900">{product.categoryName}</span>
                    </div>
                  )}
                  {product.weightGrams && (
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <span className="font-medium text-gray-600">Weight</span>
                      <span className="text-gray-900">
                        {(product.weightGrams / 1000).toFixed(2)} kg
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {product.dimensions && (
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <span className="font-medium text-gray-600">Dimensions</span>
                      <span className="text-gray-900">{product.dimensions}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-medium text-gray-600">Product Type</span>
                    <span className="text-gray-900">
                      {product.isDigital ? 'Digital' : 'Physical'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-medium text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {product.requiresShipping ? 'Required' : 'Not Required'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviewCount > 0 ? (
                  <div className="rounded-lg bg-gray-50 p-6">
                    <div className="mb-6 flex items-center gap-6">
                      <div className="text-center">
                        <div className="mb-1 text-5xl font-bold text-gray-900">
                          {product.averageRating?.toFixed(1)}
                        </div>
                        <div className="mb-1 flex items-center justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={
                                i < Math.round(product.averageRating!)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{product.reviewCount} reviews</div>
                      </div>

                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="w-8 text-sm text-gray-600">{rating}★</span>
                            <div className="h-2 flex-1 rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-yellow-400"
                                style={{ width: '0%' }}
                              />
                            </div>
                            <span className="w-8 text-sm text-gray-600">0</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                      Write a Review
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Package size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="mb-4 text-gray-600">No reviews yet</p>
                    <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                      Be the first to review
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Related products would go here - placeholder for now */}
            <div className="col-span-full py-12 text-center text-gray-500">
              Related products will be displayed here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
