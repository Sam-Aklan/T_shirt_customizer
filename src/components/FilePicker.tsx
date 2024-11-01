import { DecalTypes } from "../config/constants"
import CustomButton from "./CustomButton"

interface props  {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  readFile:(type:keyof typeof DecalTypes & string)=> void,
  file:File|undefined
}
const FilePicker = ({setFile,readFile,file}:props) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input type="file" name="" id="file-upload" 
        accept="image/*"
        onChange={(e)=> setFile(e.target.files?e.target.files[0]:undefined)}/>
        <label htmlFor="file-upload" className="filepicker-label">
          upload file
        </label>

        <p className="mt-2 text-gray-500 text-sm truncate">
          {file?file.name:"no file selected"}
        </p>
      </div>

      <div className="mt-4 flex-flex-wrap gap-3">
        <CustomButton
        type="outline"
        title="logo"
        handleClick={()=> readFile('logo')}
        customStyles="text-xs"
        />
        <CustomButton
        type="filled"
        title="Full"
        handleClick={()=> readFile('full')}
        customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker