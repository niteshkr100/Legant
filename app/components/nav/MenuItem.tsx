 interface MenuItemPorps{
    children: React.ReactNode;
    onClick: ()=> void;
 }

const MenuItem: React.FC<MenuItemPorps> = ({children, onClick}) => {
  return (
    <div onClick={onClick}
         className="
         w-[160px]
         px-4
         py-3
         text-black
         hover:bg-neutral-300
         transition
         "
    >
      {children}
    </div>
  )
}

export default MenuItem;
