import { CartProductType } from "@/app/product/[productId]/ProductDetails";
 
import { createContext, use, useCallback, useContext, useEffect, useState } from "react";
import {toast}  from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount : number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType)=> void;
    handleRemoveProductFromCart: (product: CartProductType)=> void;
    handleCartQtyIncrease: (product: CartProductType)=> void;
    handleCartQtyDecrease : (product: CartProductType)=> void;
    handleClearCart : () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null)=> void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) =>{

    const [cartTotalQty, setCartTotalQty] =  useState(0);
    const [cartTotalAmount, setCartTotalAmount] =  useState(0);

    const [cartProducts, setCartProducts] =  useState<CartProductType[] | null>(null);

    // console.log('qty', cartTotalQty);
    // console.log('amount', cartTotalAmount);

    //paymentIntent state
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
    
    
    useEffect(()=>{
        const CartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts : CartProductType[] | null = JSON.parse(CartItems);
        const eshopPaymentIntent: any = localStorage.getItem("eshopPaymentIntent");
        const paymentIntent: string | null = JSON.parse(eshopPaymentIntent);

        setCartProducts(cProducts)
        setPaymentIntent(paymentIntent);
    },[])

   //total
    useEffect(()=>{
          const getTotals = ()=>{

          if(cartProducts){
            const {total, qty} = cartProducts?.reduce((acc, item)=>{
                const itemTotal = item.price * item.quantity;
                
                acc.total += itemTotal;
                acc.qty += item.quantity;

                return acc;
            }, {
                total:0,
                qty:0
            });

            setCartTotalQty(qty);
            setCartTotalAmount(total)
          } 
        };

        getTotals();
    }, [cartProducts]);

    //add
    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        let updatedCart;
        setCartProducts((prev)=>{
           

            if(prev){
                updatedCart = [...prev, product]
            }
            else{
                updatedCart = [product];
            }
            
            return updatedCart;
        });
        toast.success("Product added to the cart");
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    }, []);

   //remove
   const handleRemoveProductFromCart = useCallback((product: CartProductType )=>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item)=>{
                    return (item.id !== product.id)
            })
            setCartProducts(filteredProducts)
            toast.success("Productremove");
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        }

   }, [cartProducts])

  //increase
   const handleCartQtyIncrease = useCallback((product:CartProductType)=>{
        let updatedCart;

        if(product.quantity == 20){
            return toast.success("oops! maximun reached");
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item)=> item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
        }
    }, [cartProducts])

    //decrease
   const handleCartQtyDecrease = useCallback((product:CartProductType)=>{
        let updatedCart;

        if(product.quantity == 1){
            return toast.error("oops! minimun reached");
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item)=> item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
        }
    }, [cartProducts])

    //clear
    const handleClearCart = useCallback(()=>{
            setCartProducts(null);
            setCartTotalQty(0);
            localStorage.setItem("eShopCartItems", JSON.stringify(null));
        }, [])

    //help us to setpayment at localstorage
    const handleSetPaymentIntent = useCallback((val: string | null)=>{
        setPaymentIntent(val);
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(val))
    }, [paymentIntent]);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent,
    };

 return <CartContext.Provider value={value} {...props}/>
};

export const useCart = () =>{
    const context = useContext(CartContext);

    if(context === null){
       throw new Error("useCart must be used CartContextProvider")
    }

    return context;
};

