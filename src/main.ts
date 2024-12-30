import { createSnake } from './components/snake';
import './style.css'
import * as THREE from 'three'


// シーンの作成
const scene = new THREE.Scene();

// カメラの設定
const camera = new THREE.PerspectiveCamera(
  75, // 視野角
  window.innerWidth / window.innerHeight, // アスペクト比
  0.1, // 近いクリップ面
  1000 // 遠いクリップ面
);
camera.rotation.x = -Math.PI / 4
camera.position.y = 5
camera.position.z = 5
// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const snake = createSnake()
scene.add(snake)
snake.position.y = 1

const geometry = new THREE.BoxGeometry(5, 0.1, 1000)
const material = new THREE.MeshBasicMaterial( {color: 0xbc763c} );
const stage = new THREE.Mesh( geometry, material )
scene.add(stage)

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);

  

  renderer.render(scene, camera);
}

animate();

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});