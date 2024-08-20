// import { AiFillPhone, AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
// import { MdOutlineKeyboard, MdStorefront, MdTv, MdWatch } from "react-icons/md";

import { FaChair } from "react-icons/fa";
import { MdStorefront, MdTableRestaurant } from "react-icons/md";
import { GiBedLamp, GiPillow, GiSofa } from "react-icons/gi";
import { BsBasket2Fill } from "react-icons/bs";

export const categories =[
    {
        label: "Home",
        icon: MdStorefront
    },
    {
        label: "Table",
        icon: MdTableRestaurant
    },
    {
        label: "Chair",
        icon: FaChair 
    },
    {
        label: "Sofa",
        icon: GiSofa
    },
    {
        label: "Lamp",
        icon: GiBedLamp 
    },
    {
        label: "Basket",
        icon: BsBasket2Fill
    },
    {
        label: "Accesories",
        icon: GiPillow 
    }
]