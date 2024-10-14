type ButtonProp = {
 text :string;
 bgColor?: string;
 onHandler?: () => void
 onHandler2?: () => void

}

 const Button :React.FC<ButtonProp>=({text,bgColor,onHandler,onHandler2}) => {
  return (
    <div>
        <button  className="bg-black p-2 rounded-xl text-white " onClick={onHandler}  onDoubleClick={onHandler2}  style={{background : bgColor}}>
          {text}
        </button>
    </div>
  )
}
 export default Button