import Image from "next/image";
// to-green-700 mb-8
const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-200 mb-8">
        <div className="mx-auto px-8 py-12 
        flex flex-col gap-2 md:flex-row items-center justify-evenly ">
            <div className="mb-8 md:mb-0 text-center">
                <h1 className="text-4xl md:text-6xl
                font-bold text-black mb-4">Shop Page</h1>
                <p className="text-lg md:text-xl text-white mb-2">Enjoy discounts on Selected items</p>
                <p className="text-2xl md:text-5xl text-red-500 font-bold">Get 50% OFF</p>
            </div>
            <div className="w-1/3 relative aspect-video">
                <Image 
                src='/furniture-ecommerce.jpg'
                fill
                alt="Banner Image"
                className="object-contain"
                />
            </div>
        </div>
    </div>
  )
}

export default HomeBanner;
