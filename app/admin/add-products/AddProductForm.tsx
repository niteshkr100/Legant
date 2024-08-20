//(page1)
'use client'

import Button from "@/app/components/Button"
import Heading from "@/app/components/Heading"
import CategoryInput from "@/app/components/inputs/CategoryInput"
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox"
import Input from "@/app/components/inputs/Input"
import SelectedColor from "@/app/components/inputs/SelectedColor"
import TextArea from "@/app/components/inputs/TextArea"
import { categories } from "@/utils/Categories"
import { Colors } from "@/utils/Colors"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import firebaseApp from "@/libs/firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import axios from "axios"
import { useRouter } from "next/navigation"
 

//Image type that we select (this is defined to use in components-->inputs---> SelectColor)
export type ImageType={
  color:string;
  colorCode:string;
  image:File|null
}

//Image type that we upload  database
export type UploadedImageType={
  color:string;
  colorCode:string;
  image:string
}

const AddProductForm = () => {
 
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages]  =  useState<ImageType[]|null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  // console.log("images<<<<", images);


  //register form field define here for using below
  const {register, handleSubmit, setValue, watch, reset, formState:{errors}} =  useForm<FieldValues>({
    defaultValues:{
      name: " ",
      description: " ",
      brand:" ",
      category:" ",
      inStock:false,
      images:[],
      price:" "
    }
  })

useEffect(()=>{
  setCustomValue('images', images)
}, [images])

useEffect(()=> {
 if(isProductCreated){
  reset();
  setImages(null);
  setIsProductCreated(false)
 }
}, [isProductCreated])

//onSubmit working defined
const onSubmit: SubmitHandler<FieldValues> = async (data)=>{
  // (we get new created product details here)
  console.log("Product data", data);

  //upload images to firebase**
  //save product to database
  setIsLoading(true)

  //type of uploadedImages is UploadedImageType of string array
  //onloading at firebase below , then we uload images in this array;
  let uploadedImages : UploadedImageType[]= [];

    //check category is selected or not
    if(!data.category){
      setIsLoading(false);
      return toast.error('Category is not selected')
    }
    //check images is selected or not
    if(!data.images || data.images.length == 0){
      setIsLoading(false);
      return toast.error('Images is not selected')
    }

    //handle submit
    // https://firebase.google.com/docs/storage/web/upload-files#manage_uploads(used logic of firebase storage for storing images)
    const handleImageUploads =  async ()=>{
      toast("Creating Product, please wait sir...");

      try{
        for(const item of data.images){
          if(item.image){
            // make each image save with unquie name
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage= getStorage(firebaseApp);
            //define folder path
            const storageRef = ref(storage, `products/${fileName}`);
            //upload 
            const uploadTask= uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject)=>{
              // 'state_changed' observer, called any time the state changes(1)
              uploadTask.on('state_changed', 

              // track the image-------------(2)
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                   }
                  }, 
                  // Handle unsuccessful uploads(3)
                  (error) => {
                    console.log('Error uploading image', error)
                    reject(error);
                  }, 
                  // Handle successful uploads on complete(4)
                  () => {
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      // store in this array------
                      uploadedImages.push({
                        ...item, image: downloadURL,
                      });
                      console.log('File available at', downloadURL);
                      resolve();
                    })
                    .catch((error)=>{
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                  }
              );
            });

          }
        }
      }catch(error){
        setIsLoading(false)
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      }
    };
    //uploadImage see on console----------
    await handleImageUploads();
    const productData = {...data, images: uploadedImages};
    // console.log(productData);

    //using axios Api to send data to MongoDb---------------
    axios.post("/api/product/", productData).then(()=>{
      toast.success("Product created");
      // it will clear form state by setting
      setIsProductCreated(true);
      router.refresh()
    }).catch((error)=>{
      console.log(error);
      toast.error("Something went wrong on saving the product to db");
    }).finally(()=>{
      setIsLoading(false);
    })
};

const category= watch('category');

//customvalue defined here
const setCustomValue = (id:string, value:any)=>{
  setValue(id, value, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch:true,
  })
}

//addImage
const addImageToState = useCallback((value:ImageType)=>{
  setImages((prev)=>{
    if(!prev){
      return [value]
    }
    return[...prev, value]
  })
}, [])

//removeImage
const removeImageFromState = useCallback((value:ImageType)=>{
    setImages((prev)=>{
      if(prev){
        const filteredImages = prev.filter((item)=> item.color != value.color);
        return filteredImages;
      }

      return prev;
    })
}, [])

  return (
     <>
      <Heading title="Add a Product" center/>
      <Input 
      id="name"
      label="Name"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
      />
      <Input 
      id="price"
      label="Price"
      disabled={isLoading}
      register={register}
      errors={errors}
      type="number"
      required
      />
      <Input 
      id="brand"
      label="Brand"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
      />
      <TextArea 
      id="description"
      label="Description"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
      />
      <CustomCheckBox 
      id="inStock" 
      register={register} 
      label="This product is in stock"
      />

      {/* section2(category) */}

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-scroll">
          {/* utilis->categotries -----> admin-> AddProductForm */}
          {categories.map((item)=>{
            if(item.label == "All"){
              return null;
            }
            // components -> inputs -> CategoryInput(component import from here)
            return(
            <div key={item.label} className="col-span">
            <CategoryInput 
             onClick={(category)=>setCustomValue("category", category)}
             selected={category == item.label}
             label={item.label}
             icon={item.icon}
            />
              </div>
            )
            
          })}
        </div>
      </div>

      {/* section3 (selecting )*/}
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the  available product colors and upload the images
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise your color selection will be ignored
          </div>
        </div>


        <div className="grid grid-cols-2 gap-3">
          {Colors.map((item, index)=>{

            //// components -> inputs -> SelectColor(import component from here )
            return (
            <SelectedColor
             key={index} 
             item={item}
             addImageToState={addImageToState}
             removeImageFromState={removeImageFromState}
             isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>

     {/* onSubmit define above */}
      <Button label={isLoading? 'Loading...':'Add Product'} onClick={handleSubmit(onSubmit)}/>
    </>
    
  )
}

export default AddProductForm;
