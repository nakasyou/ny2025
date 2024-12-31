import { Group, SphereGeometry, MeshBasicMaterial, Mesh, NotEqualDepth } from "three"
import { frontFacing } from "three/tsl"
import { degToRad } from "../lib/rad"

export const createSnake = () => {
  const group = new Group()
  
  /*for (let i = 0; i < 10; i++) {
    const geometry = new SphereGeometry(0.05, 32, 32)
    const material = new MeshBasicMaterial({ color: 0x837B5D })
    const material = new MeshBasicMaterial({ color: 0x837B5D })
    sphere.position.setZ(i * 0.1)
    sphere.position.setX(Math.sin(i) * 0.05)
    group.add(sphere)
  }*/

  let frame = 0
  return {
    snake: group,
    updateSnake(length: number) {
      const neededSpheres = Math.max(5, Math.ceil(length / 5))
      if (neededSpheres > group.children.length) {
        // Need to create
        for (let i = 0; i = neededSpheres - group.children.length; i++) {
          const geometry = new SphereGeometry(0.02, 32, 32)
          const material = new MeshBasicMaterial({ color: 0x837B5D })
          const sphere = new Mesh(geometry, material)
          group.add(sphere)
        }
      } else if (neededSpheres < group.children.length) {
        // Need to reduce
        for (let i = 0; i = group.children.length - neededSpheres; i++) {
          group.remove(group.children[0])
        }
      }
      const zLen = neededSpheres > 20 ? 0.02 * 20 : 0.02 * neededSpheres
      const width = neededSpheres > 20 ? 0.5 : 0.02 * neededSpheres
      const baseX = -Math.cos(degToRad(frame)) * width / 2
      for (let i = 0; i < group.children.length; i++) {
        const child = group.children[i]
        const rate = i / group.children.length
        child.position.setX(Math.cos(degToRad(i * 2 + frame)) * width / 2 + baseX)
        child.position.setZ(zLen - rate * zLen)
      }
      frame += 5
    }
  }
}
