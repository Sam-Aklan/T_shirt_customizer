import { useSnapshot } from "valtio"
import state from "../store"
import { getContrastingColor } from "../config/helpers"

interface props{
    type:string,
    title:string,
    customStyles:string,
    handleClick:()=>void
}
const CustomButton = ({
    type,title,customStyles,handleClick
}:props) => {
    const snap = useSnapshot(state)
    const generateStyle = (type:string) => {
        if(type === 'filled') {
          return {
            backgroundColor: snap.color,
            color: getContrastingColor(snap.color),
            // color:'#fff'
          }
        } else if(type === "outline") {
          return {
            borderWidth: '1px',
            borderColor: snap.color,
            color: snap.color
          }
        }
      }
    return (
        <button
          className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
          style={generateStyle(type)}
          onClick={handleClick}
        >
          {title}
        </button>
      )
    }


export default CustomButton