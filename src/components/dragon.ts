import { PlaneGeometry, TextureLoader, MeshBasicMaterial, Mesh } from "three";
import dragon from '../assets/dragon.png?url'

export const createDragon = () => {
    const geometry = new PlaneGeometry(10, 10)
    const texture = new TextureLoader().load(dragon)
    const material = new MeshBasicMaterial({map: texture, transparent: true})
    const mesh = new Mesh(geometry, material)
    return mesh
}
