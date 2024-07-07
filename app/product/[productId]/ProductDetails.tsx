 //this interface property is coming from prisma that we cover later----
//this is server component to make it client component we---
"use client"

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hook/useCart";
 
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

 interface ProductDetailsProps {
    product : any;
}

//product show
export type  CartProductType = {
     id: string;
     name: string;
     description : string;
     category: string;
     brand: string ; 
     selectedImg: SelectedImgType;
     quantity: number;
     price: number;
}
export type SelectedImgType ={
    color: string;
    colorCode:string ;
    image: string;
}

const Horizontal = () =>{
    return <hr className="w-[30%] my-2"/>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
 
    const {handleAddProductToCart, cartProducts} =  useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description : product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
   });

   const router =  useRouter();

   console.log(cartProducts);//
     
   //logic for checking item in cart or not
   useEffect(()=>{
    setIsProductInCart(false);
    if(cartProducts){
        const existingIndex = cartProducts.findIndex((item)=> item.id === product.id)

        if(existingIndex > -1){
            setIsProductInCart(true);
        }
    }
       
   },[cartProducts])

   
   const ProductRating =  product.reviews.reduce((acc:number, item:any)=>
    item.rating + acc, 0)/ product.reviews.length;
   
   //handlecolorSelect for image 
   const handleColorSelect = useCallback(
    (value: SelectedImgType)=>{
        setCartProduct((prev)=>{
            return{...prev, selectedImg:value}
        })
   }, [cartProduct.selectedImg])

  //button increase and decrease function
   const handleQtyIncrease = useCallback(()=> {
    //limit to add product
    if(cartProduct.quantity >= 20){
        return;
    }
        setCartProduct((prev)=>{
            return{...prev, quantity : ++prev.quantity}
        }) 
   }, [cartProduct])

   const handleQtyDecrease = useCallback(()=> {
    //limit to decrease quantity product less 1
       if(cartProduct.quantity <= 1){  ///errorr solve it later
           return;
       }

       setCartProduct((prev)=>{
           return{...prev, quantity : --prev.quantity}
       })
  }, [ cartProduct])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12  mt-12">
        
         <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>

        <div className="flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <div className="flex items-center gap-2">
              <Rating value={ProductRating} readOnly/>
              <div >{product.reviews.length} reviews</div>
            </div>
            <Horizontal/>
            <div className="text-justify">{product.description}</div>
            <Horizontal/>
            <div>
                <span className="font-semibold">CATEGORY:</span>
                {product.category}
            </div>
            <div>
                <span className="font-semibold">Brand:</span>
                {product.brand}
            </div>
            <div className={product.inStock? "text-teal-400" : "text-rose-400"}>{product.inStock? 'In Stock' :'Out of Stock'}</div>
            <Horizontal/>

            {/* product cart action design */}
            {isProductInCart? 
            <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle className="text-teal-400" size={20}/>
                <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
                 <Button label="View cart" outline onClick={()=>{
                    router.push('/cart');
                 }}/>   
            </div>
            </> 
            : 
            <>
            <SetColor 
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
             />
            <Horizontal/>
             <SetQuantity 
                cartProduct={cartProduct}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease}
             />
            <Horizontal/>
            <div className="max-w-[300px]">
                <Button 
                  label="Add to Cart"
                  onClick={()=>handleAddProductToCart(cartProduct)}
                />
            </div>
            </>}
        </div>
    </div>
  )
}

export default ProductDetails
