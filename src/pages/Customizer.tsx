import { useSnapshot } from "valtio"
import {motion,AnimatePresence} from 'framer-motion'
import state from "../store"
import { fadeAnimation, slideAnimation } from "../config/motion"
import { EditorTabs, FilterTabs,DecalTypes } from "../config/constants"
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components"
import { useState } from "react"
import { reader } from "../config/helpers"
const Customizer = () => {
  const snap = useSnapshot(state)
  // show tab content depending on the active tab
  const[file, setFile] =useState<File>()
  // const [prompt, setPrompt] = useState('')
  // const [generateImag, setGenerateImag] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt:true,
    stylishShirt:false
  })
  const generateTabContent = ()=>{
    switch (activeEditorTab) {
      case "colorpicker":
        return<ColorPicker/>
      case "filepicker":
        return<FilePicker
        setFile={setFile}
        readFile={readFile}
        file={file}/>
      case "aipicker":
        return<AIPicker/>
    
      default:
        return null
    }
  }
  const handleActiveFilterTab = (tabName:string)=>{
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isFullTexture= true,
        state.isLogoTexture=false
        break;
    }
    setActiveFilterTab((pre)=>{
      return{
        ...pre,
        //@ts-expect-error ignore
        [tabName]:!pre[tabName]
      }
    })
  }
  const handleDecals=(type:keyof typeof DecalTypes & string ,result:any)=>{
    const decalType = DecalTypes[type] 
    switch (decalType.stateProperty) {
      case "logoDecal":
        state[decalType.stateProperty] = result 
        break;
      case "fullDecal":
        state[decalType.stateProperty] = result
        break
    
      default:
        break;
    }
  }
  const readFile = (type:keyof typeof DecalTypes & string)=>{
    file? reader(file).then(
      (result)=>{
        handleDecals(type,result)
        setActiveEditorTab("")
      }
    ):null
  }

  const activeFilterTabFn = (name:string)=>{
    switch (name) {
      case "logoShirt":
        return activeFilterTab[name];
      case "stylishShirt":
        return activeFilterTab[name]
    
      default:
        break
    }
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
          key="custom"
          className="absolute top-0 left-0 z-10"
          {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editors-container tabs">
                {EditorTabs.map((tab)=>(
                    <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={()=>setActiveEditorTab(tab.name)}/>
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5"
          {...fadeAnimation}>
            <CustomButton type="filled"
            title="Go Back"
            handleClick={()=> state.intro = true}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>

          </motion.div>

          <motion.div
          className="filtertabs-container"
          {...slideAnimation('up')}>
            {FilterTabs.map((tab)=>(
                    <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTabFn(tab.name)}
                    handleClick={()=>handleActiveFilterTab(tab.name)}/>
                ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer