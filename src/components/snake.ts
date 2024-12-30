import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from "three"

export const createSnake = () => {
  const group = new Group()
  
  for (let i = 0; i < 10; i++) {
    const geometry = new SphereGeometry(0.05, 32, 32)
    const material = new MeshBasicMaterial({ color: 0x837B5D })
    const sphere = new Mesh(geometry, material)
    sphere.position.setZ(i * 0.1)
    sphere.position.setX(Math.sin(i) * 0.05)
    group.add(sphere)
  }

  return group
}
