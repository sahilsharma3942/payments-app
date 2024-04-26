const InputBox = ({label, placeholder, onChange})=>{
    return <div>
        <div className="text-left text-sm font-medium py-2">{label}</div>
        <input className="w-full px-2 py-1 border border-slate-200 rounded" placeholder={placeholder} onChange={onChange}/>
    </div>
}


export default InputBox;