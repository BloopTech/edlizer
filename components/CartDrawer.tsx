"use client";

import React, { useState } from "react";
import { Product } from "./ProductCard";
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Check,
} from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"ship" | "pickup">("ship");

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedDiscount
    ? (rawSubtotal * appliedDiscount) / 100
    : 0;

  const subtotal = rawSubtotal - discountAmount;
  const freeDeliveryThreshold = 800;
  const progressToFreeDelivery = Math.min(
    100,
    (subtotal / freeDeliveryThreshold) * 100
  );
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 35;
  const total = subtotal + deliveryFee;

  const handleApplyCode = () => {
    if (discountCode.trim().toUpperCase() === "NOURISH20") {
      setAppliedDiscount(20);
      setDiscountError("");
    } else if (discountCode.trim().length > 0) {
      setDiscountError("Invalid promo code. Try NOURISH20");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#e6e0d3] flex items-center justify-between bg-[#f7f4ee]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#b58124]" />
              <h3 className="font-display text-lg font-semibold text-[#171512]">
                Your Sacred Ritual Bag
              </h3>
              <span className="text-xs bg-[#efe9de] text-[#201c17] px-2 py-0.5 rounded-full font-sans tabular-nums">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#efe9de] text-[#201c17] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3 bg-[#f7f4ee] border-b border-[#e6e0d3] text-xs">
            {amountForFreeDelivery > 0 ? (
              <p className="text-[#6f6a60] mb-1.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C58E2A]" />
                Add{" "}
                <strong className="text-[#171512]">
                  GHS {amountForFreeDelivery.toFixed(2)}
                </strong>{" "}
                more to unlock Free Delivery across Accra!
              </p>
            ) : (
              <p className="text-[#2f8f5c] font-semibold flex items-center gap-1.5 mb-1.5">
                <Check className="w-4 h-4" /> You unlocked Complimentary Free Delivery!
              </p>
            )}
            <div className="w-full bg-[#efe9de] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C58E2A] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeDelivery}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f7f4ee] flex items-center justify-center mx-auto text-[#a49e91]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-[#171512]">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-[#6f6a60] mt-1">
                    Discover our newest clean formulations made to nourish and illuminate.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-[#171512] text-white hover:bg-[#b58124] text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 rounded-2xl bg-[#f7f4ee] border border-[#e6e0d3] relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#efe9de] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-display font-medium text-sm text-[#171512] line-clamp-1">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#a49e91] hover:text-[#d0263c] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#6f6a60]">
                        Size: {item.size} • {item.product.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Stepper */}
                      <div className="inline-flex items-center border border-[#e6e0d3] rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 text-[#6f6a60] hover:text-[#171512]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#171512]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 text-[#6f6a60] hover:text-[#171512]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="font-semibold text-sm text-[#171512]">
                        GHS {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#e6e0d3] space-y-4">
              {/* Discount Code Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code (e.g. NOURISH20)"
                    className="w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-full pl-9 pr-3 py-2 text-xs uppercase font-sans focus:outline-none focus:border-[#C58E2A]"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#a49e91] absolute left-3 top-2.5" />
                </div>
                <button
                  onClick={handleApplyCode}
                  className="bg-[#171512] text-white hover:bg-[#C58E2A] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-colors"
                >
                  Apply
                </button>
              </div>

              {discountError && (
                <p className="text-[11px] text-[#d0263c]">{discountError}</p>
              )}
              {appliedDiscount && (
                <p className="text-[11px] text-[#2f8f5c] flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" /> 20% Discount Code Applied!
                </p>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-[#6f6a60] pt-2 border-t border-[#e6e0d3]">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="text-[#171512] font-semibold">
                    GHS {rawSubtotal.toFixed(2)}
                  </span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-[#2f8f5c]">
                    <span>Discount (20%)</span>
                    <span>-GHS {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Delivery</span>
                  <span className="text-[#171512] font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-[#2f8f5c]">FREE</span>
                    ) : (
                      `GHS ${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#171512] pt-2 border-t border-[#e6e0d3]">
                  <span>Total</span>
                  <span className="font-display text-lg">
                    GHS {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Main Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full bg-[#171512] text-white hover:bg-[#C58E2A] py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#a49e91]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2f8f5c]" />
                <span>256-Bit SSL Encrypted • Mobile Money & Card Payments</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
