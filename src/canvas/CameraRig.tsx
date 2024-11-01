import { ReactNode, useRef } from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import * as THREE from 'three'
import * as easing from 'maath/easing'
import { useFrame } from '@react-three/fiber'
interface props{
  children:ReactNode
}

const CameraRig = ({children}:props) => {
  const snap = useSnapshot(state)
  const group = useRef<any>()
  const isBreakpoint = window.innerWidth < 1260
  const isMobile = window.innerWidth < 600
  // intial postion of model
  let targetPostion = [-0.4,0,2]
    if (snap.intro) {
      if(isBreakpoint) targetPostion = [0,0,2];
      if(isMobile) targetPostion = [0,0.2,2.5]
    }else{
      if(isMobile) targetPostion = [0,0,2.5]
      else targetPostion = [0,0,2]
    }

    // camera postion
    // console.log("ref",group.current)
    useFrame((state,delta)=>{
      // console.log(state.pointer.x)
      easing.dampE(
        group.current?.rotation,
        [state.pointer.y/10, -state.pointer.x /5 , 0],
        0.25,
        delta
      )
      easing.damp3(state.camera.position,targetPostion,0.25,delta)
  })
  // rotating smoothly
  return (
    <group ref={(e)=>group.current=e}>
      {children}
    </group>
  )
}

export default CameraRig