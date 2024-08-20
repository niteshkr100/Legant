"use client";
// it is a client side component b/c it use browser side capabilities

// High Order Components
import { CartContextProvider } from "@/hook/useCart";

interface CartProviderProps{
    children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({children}) =>{
    return( <CartContextProvider>{children} </CartContextProvider>)
        // import from hook  
        // (children as nav main footer which are inside cartprovider in app layout.tsx)
        
     
}

export default CartProvider;