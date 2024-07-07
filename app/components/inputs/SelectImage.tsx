"use client"

//--Make use of library called --------||react-dropzone(npm)||-------------- 
// Simple React hook to create a HTML5-compliant drag'n'drop zone for files.

//this is design to use in---> SelectedColor--- for showing image add section when checked

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'


interface SelectImageProps{
    item?: ImageType;
    handleFileChange: (value:File)=> void; //function
}

const SelectImage:React.FC<SelectImageProps> = ({item, handleFileChange}) => {

    const onDrop = useCallback((acceptedFiles:File[]) => {
        // Do something with the files
        //only store One-File
        if(acceptedFiles.length > 0){
            handleFileChange(acceptedFiles[0]);
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, 
        accept: {
        'image/*': ['.jpeg', '.png']
        }
    })

  return (
    //The useDropzone hook just binds the necessary handlers to create a drag 'n' drop zone. Use the getRootProps() fn to get the props required for drag 'n' drop and use them on any element. For click and keydown behavior, use the getInputProps() fn and use the returned props on an <input>.
    <div {...getRootProps()} className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center">
      <input {...getInputProps()} />
      {isDragActive?
      (<p>Drop the image here</p>)
      :
      (<p>+ {item?.color} Image</p>)}
    </div>
  )
}

export default SelectImage
