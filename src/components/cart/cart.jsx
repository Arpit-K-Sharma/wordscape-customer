import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";


const Cart = () => {
  const cart = useSelector((state) => state.cart.data);
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const dispatch = useDispatch();
  
  function removeFromCartHandler(product) {
    dispatch(removeFromCart(product));
  }
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col overflow-y-auto bg-white shadow-xl p-6">
        <div className="px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
          </div>
          

          {cart && cart.length > 0 ? (
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.map((cartItem, index) => {
                    console.log(cartItem.product.title);
                    
                    return (
                      <li key={cartItem.id || index} className="flex py-6">
                  
                     
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"></div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                        
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{cartItem.product.title}</a>{" "}
                             
                            </h3>
                            <p className="ml-4">${cartItem.product.price}</p>{" "}
                            
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {cartItem.product.description}{" "}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qty {cartItem.quantity}
                          </p>{" "}
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => {removeFromCartHandler(index)}}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">
              Your cart is empty.
            </p>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>XXX</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
