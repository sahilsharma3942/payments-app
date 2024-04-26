const Button =({label,onClick})=>{
    return <button  className="w-full bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-4 rounded-lg font-medium text-sm px-5 py-2.5  my-2" type="button" onClick={onClick}>{label}</button>
}


export default Button;