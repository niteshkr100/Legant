import Link from "next/link"
import Container from "../Container"
import FooterList from "./FooterList"
import { MdFacebook } from "react-icons/md"
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai"

 
const Footer = () => {
  return (
    <footer className="bg-black text-slate-200 text-sm mt-16">
       <Container> 
         <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
            <FooterList>
                <h3 className="text-base font-bold">Shop Categories</h3>
                <Link href="#">Table</Link>
                <Link href="#">Chair</Link>
                <Link href="#">Sofa</Link>
                <Link href="#">Lamp</Link>
                <Link href="#">Basket</Link>
                <Link href="#">Accesories</Link>
            </FooterList>
            <FooterList>
                <h3 className="text-base font-bold">Customer Service</h3>
                <Link href="#">Contact Us</Link>
                <Link href="#">Shipping Policy</Link>
                <Link href="#">Return & Exchange</Link>
                <Link href="#">FAQs</Link>
            </FooterList>
            <div className="w-full md:w-1/3 mb-6 md:mb-6">
                <h3 className="text-base font-bold mb-2">About Us</h3>
                <p className="mb-2">Welcome to 3legent, your ultimate online destination for unique and trendy products! We’re dedicated to bringing you exceptional quality, unbeatable prices, and outstanding customer service. Explore our diverse range, tailored to enhance your lifestyle. Shop with us and experience the difference!</p>
                <p>&copy; {new Date().getFullYear()} 3legent</p>
            </div>
            <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24}/>
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24}/>
              </Link>
              <Link href="#">
                <AiFillInstagram size={24}/>
              </Link>
              <Link href="#">
                <AiFillYoutube size={24}/>
              </Link>
            </div>
            </FooterList>
         </div>
       </Container> 
    </footer>
  )
}

export default Footer
