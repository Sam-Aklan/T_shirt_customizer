import {Canvas} from '@react-three/fiber'
import {Environment, Center, Html} from '@react-three/drei'
import CameraRig from './CameraRig'
import Backdrop from './Backdrop'
import Shirt from './Shirt'
import { Suspense } from 'react'
const CanvasModel = () => {
  return (
    <Canvas
    shadows
    camera={{position:[0,0,0], fov:25}}
    gl={{preserveDrawingBuffer:true}}
    className='w-full max-w-full h-full transition-all ease-in'>
      <ambientLight intensity={0.5}/>
      <Environment preset='city'/>

      <CameraRig>
        <Backdrop/>
        <Center>
          <Suspense fallback={<Html>loading...</Html>}>
          <Shirt/>
          </Suspense>
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel