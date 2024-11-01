import * as easing from 'maath/easing'
import {useSnapshot} from 'valtio'
import {useFrame} from '@react-three/fiber'
import {Decal, useGLTF, useTexture} from '@react-three/drei'
import state from '../store'
const Shirt = (props:any) => {
  const snap = useSnapshot(state)
  const {nodes,materials} = useGLTF('./shirt_baked.glb')
  console.log("nodes: ",nodes)
  console.log("materail: ", materials)

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal)
  useFrame((delta)=>{
    //@ts-expect-error ignore
    easing.dampC(materials.lambert1.color,snap.color,0.25,delta)
  })
  const statestt = JSON.stringify(snap)
  return (
    <group {...props} dispose={null}
    key={statestt}>
      <mesh
        castShadow
        receiveShadow
        //@ts-expect-error ignore
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        {snap.isFullTexture && (
          <Decal
          position={[0,0,0]}
          rotation={[0,0,0]}
          scale={1}
          map={fullTexture}/>
        )}

        {snap.isLogoTexture && (
          <Decal
          position={[0,0.04,0.15]}
          rotation={[0,0,0]}
          scale={0.15}
          map={logoTexture}
          //@ts-expect-error
          anisotropy={16}
          depthTest={false}
          depthWrite={false}/>
        )}
      </mesh>
    </group>
  )
}
useGLTF.preload('./shirt_baked.glb')
export default Shirt