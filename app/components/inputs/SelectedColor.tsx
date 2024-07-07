 "use client"

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";


interface SelectedColorProps{
    item:ImageType; //
    addImageToState:(value:ImageType)=>void; //function
    removeImageFromState:(value:ImageType)=>void; //function
    isProductCreated: boolean;
}

const SelectedColor:React.FC<SelectedColorProps> = ({
    item, 
    addImageToState,
    removeImageFromState, 
    isProductCreated
   }) => {

    const [isSelected, setIsSelected] =  useState(false)
    const [file, setFile] =  useState<File|null>(null)

    // to check product is already created or not
    useEffect(()=>{
        if(isProductCreated){
            setIsSelected(false);
            setFile(null)
        }

    }, [isProductCreated])

    //receive value from----> SelectImage-------->file value came from there
    const handleFileChange = useCallback((value:File)=>{
        setFile(value);
        addImageToState({...item, image:value});

    }, [])

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        setIsSelected(e.target.checked);

        //if we unchecked then image will removed
        if(!e.target.checked){
            setFile(null);
            removeImageFromState(item)
        }
    }, [])

   return(
    <div className="grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
        <div className="flex flex-row gap-2 items-center h-[60px]">
            <input id={item.color} type="checkbox" checked={isSelected} onChange={handleCheck} className="cursor-pointer"/>
            <label htmlFor={item.color} className="font-medium cursor-pointer">
                {item.color}
            </label>
        </div>
        <>
        {isSelected && !file && (
            <div className="col-span-2 text-center">
                {/* come from SelectImage */}
                <SelectImage item={item} handleFileChange={handleFileChange}/>
            </div>
        )}
        {/* file exist */}
        {file && (
            <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
             {/* ?.: The optional chaining operator. It checks if file is not null or undefined before trying to access its name property.
file?.name: This expression evaluates to undefined if file is null or undefined. Otherwise, it returns the value of the name property of the file object. */}
                <p>{file?.name}</p>
                <div className="w-70px">
                    <Button label="Cancel" onClick={()=>{
                        setFile(null)
                        removeImageFromState(item)
                    }}/>
                </div>
            </div>
        )}
        </>
     </div>
   )
}

export default SelectedColor;
