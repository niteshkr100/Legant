 'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

// (work later)**
const SearchBar = () => {
   const router =  useRouter();

//form
 const {
    register,
    handleSubmit, 
    reset, 
    formState:{errors}} = useForm<FieldValues>({
    defaultValues: {
        searchTerm: ''
    }
 })

// handle submit
const onSubmit: SubmitHandler<FieldValues> = async(data)=>{
    console.log(data);

    if(!data.searchTerm) {return router.push('/')}

    const url = queryString.stringifyUrl({
        url:'/',
        query:{
            searchTerm: data.searchTerm
        }
    },{skipNull:true})

    console.log(url)

    router.push(url)
    reset()
}


  return (
    <div className="flex items-center">
      <input
      {...register('searchTerm')}
      autoComplete="off"
      type="text"
      placeholder="Search product"
      className="p-2 border text-black border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
      />
      <button onClick={handleSubmit(onSubmit)} className="bg-yellow-500 hover:opacity-80 text-white p-2 rounded-r-md">Search</button>
    </div>
  )
}

export default SearchBar
