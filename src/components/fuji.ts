import { Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshStandardMaterial, PlaneGeometry } from 'three'
import fujiData from '../assets/fuji.csv?url'
import { degToRad } from '../lib/rad'

const cache = await caches.open('fuji')
const req = new Request(new URL(fujiData, location.href))
const res = await cache.match(req) ?? await fetch(req)
cache.put(req, res.clone())
const csv = await res.text()

const data = csv.split(',').map(e => Number.parseFloat(e))
const size = Math.sqrt(data.length)

export const createFuji = () => {
  const geometry = new PlaneGeometry(5, 5, size - 1, size - 1)
  geometry.rotateX(-degToRad(90))
  const material = new MeshBasicMaterial({ 
    color: 0x10568B,
    wireframe: true
  })
  const positionAttribute = geometry.attributes.position;
  for (let i = 0; i < positionAttribute.count; i++) {
    const elevation = data[i]; // 標高データを取得
    positionAttribute.setY(i, elevation / 10); // Z座標に標高を適用
  }
  positionAttribute.needsUpdate = true; // 更新を通知
  
  const mesh = new Mesh(geometry, material)
  return mesh
}
