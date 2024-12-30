import { createQuizPanel, createReducePanel } from './components/panel';
import { createSnake } from './components/snake';
import { setQuestion } from './lib/display';
import { degToRad } from './lib/rad';
import { Quiz, QUIZZES } from './quizzes';
import './style.css'
import * as THREE from 'three'


// シーンの作成
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // 空の色
// カメラの設定
const camera = new THREE.PerspectiveCamera(
  75, // 視野角
  window.innerWidth / window.innerHeight, // アスペクト比
  0.1, // 近いクリップ面
  1000 // 遠いクリップ面
);
camera.rotation.x = degToRad(-20)
camera.position.y = 5
camera.position.z = 7
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const snake = createSnake()
snake.castShadow = true;
scene.add(snake)
snake.position.y = 0.1
snake.position.z = 2

const BASE_SPEED = 0.1
let speed = BASE_SPEED
renderer.domElement.addEventListener('pointermove', e => {
  const x = e.clientX / window.innerWidth
  snake.position.x = Math.min(Math.max((x - 0.5) * 7, -2), 2)

  // 動くと減速する
  speed *= 0.9
})

const stageGeometry = new THREE.BoxGeometry(5, 0.1, 1000)
const stageMaterial = new THREE.MeshBasicMaterial( {color: 0xbc763c} );
const stageMesh = new THREE.Mesh(stageGeometry, stageMaterial)
scene.add(stageMesh)


const QUIZ_BETWEEN = 40
const BETWEEN_QUIZ_AND_REDUCE = 10

// Create Quiz Panel
const panels: ({
  type: 'quiz'
  z: number
  quiz: Quiz
} | {
  type: 'reduce'
  z: number
  reducePoint: number
})[] = []
{
  // 現在の最大値ポイント
  // 10からスタート
  let crrPoint = 10
  for (let i = 0; i < 10; i++) {
    const quiz = QUIZZES[Math.floor(Math.random() * QUIZZES.length)]
    const pointIfCorrect = quiz.answer === 'left' ? quiz.leftAnswer(crrPoint) : quiz.rightAnswer(crrPoint)
    const pointIfWrong = quiz.answer === 'left' ? quiz.rightAnswer(crrPoint) : quiz.leftAnswer(crrPoint)

    // 間違えたらその後のパネルでゲームオーバーになるように、ポイントを引くためのパネルの引く量を計算
    const reducePanelPoint = -pointIfWrong

    // 問題パネル
    const panel = createQuizPanel(quiz)
    panel.position.z = -i * QUIZ_BETWEEN
    scene.add(panel)

    setQuestion(quiz.questionMathJax || '')

    // 間違えたらゲームオーバーのためのパネル
    const reducePanel = createReducePanel(reducePanelPoint)
    reducePanel.position.z = -i * QUIZ_BETWEEN - BETWEEN_QUIZ_AND_REDUCE
    scene.add(reducePanel)

    panels.push({ type: 'quiz', z: -i * QUIZ_BETWEEN, quiz })
    panels.push({ type: 'reduce', z: -i * QUIZ_BETWEEN - BETWEEN_QUIZ_AND_REDUCE, reducePoint: reducePanelPoint })

    crrPoint = pointIfCorrect
  }
}

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);
  camera.position.z -= speed
  snake.position.z -= speed
  renderer.render(scene, camera);

  speed += (BASE_SPEED - speed) / 3
}

animate();

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
