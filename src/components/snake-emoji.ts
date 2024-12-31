
import { PlaneGeometry, TextureLoader, MeshBasicMaterial, Mesh } from "three";
import dragon from '../assets/snake.png?url'

export const createSnakeEmoji = () => {
  const geometry = new PlaneGeometry(10, 10)
  const texture = new TextureLoader().load(dragon)
  const material = new MeshBasicMaterial({map: texture, transparent: true})
  const mesh = new Mesh(geometry, material)
  return mesh
}
