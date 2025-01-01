import { createDragon } from './components/dragon';
import { createQuizPanel, createReducePanel } from './components/panel';
import { createSnake } from './components/snake';
import { setIsGameovered, setQuestion, setSnakeLength } from './lib/display';
import { degToRad } from './lib/rad';
import { Quiz, QUIZZES } from './quizzes';
import './style.css'
import * as THREE from 'three'
import clearScene, { endStep } from './clear-scene'

await new Promise(r => {
  const cover = (document.getElementById('cover') as HTMLDivElement)
  cover.onclick = () => {
    r(null)
    cover.remove()
  }
  new URL(location.href).searchParams.has('force') && cover.click()
})

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
renderer.domElement.id = 'main-canvas'
document.body.appendChild(renderer.domElement);

const { snake, updateSnake } = createSnake()
snake.castShadow = true;
scene.add(snake)
snake.position.y = 0.1
snake.position.z = 2

const BASE_SPEED = 0.1
let speed = BASE_SPEED
renderer.domElement.addEventListener('pointermove', e => {
  const x = e.clientX / window.innerWidth
  snake.position.x = Math.min(Math.max((x - 0.5) * 10, -2), 2)

  // 動くと減速する
  speed *= 0.8
})

const stageGeometry = new THREE.BoxGeometry(5, 0.1, 1000)
const stageMaterial = new THREE.MeshBasicMaterial( {color: 0xbc763c} );
const stageMesh = new THREE.Mesh(stageGeometry, stageMaterial)
scene.add(stageMesh)

const INITIAL_SNAKE_LENGTH = 50
const QUIZ_BETWEEN = 50
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
  let crrPoint = INITIAL_SNAKE_LENGTH
  for (let i = 0; i < QUIZZES.length; i++) {
    const quiz = QUIZZES[i]
    const pointIfCorrect = quiz.answer === 'left' ? quiz.leftAnswer(crrPoint) : quiz.rightAnswer(crrPoint)
    const pointIfWrong = quiz.answer === 'left' ? quiz.rightAnswer(crrPoint) : quiz.leftAnswer(crrPoint)

    // 間違えたらその後のパネルでゲームオーバーになるように、ポイントを引くためのパネルの引く量を計算
    const reducePanelPoint = -pointIfWrong

    // 問題パネル
    const panel = createQuizPanel(quiz)
    panel.position.z = (-i-1) * QUIZ_BETWEEN
    scene.add(panel)

    // 間違えたらゲームオーバーのためのパネル
    const reducePanel = createReducePanel(reducePanelPoint)
    reducePanel.position.z = (-i-1) * QUIZ_BETWEEN - BETWEEN_QUIZ_AND_REDUCE
    scene.add(reducePanel)

    panels.push({ type: 'quiz', z: (-i-1) * QUIZ_BETWEEN, quiz })
    panels.push({ type: 'reduce', z: (-i-1) * QUIZ_BETWEEN - BETWEEN_QUIZ_AND_REDUCE, reducePoint: reducePanelPoint })

    crrPoint = pointIfCorrect + reducePanelPoint
  }
}

const dragon = createDragon()
dragon.position.setY(2)
dragon.position.setZ(-((QUIZZES.length + 1) * QUIZ_BETWEEN))
scene.add(dragon)

let isGameCleared = new URL(location.href).searchParams.has('force')
let isGameOvered = false
let snakeLength = INITIAL_SNAKE_LENGTH
let nextPanelIndex = 0
function step() {
  if (!isGameOvered && !isGameCleared) {
    speed += (BASE_SPEED - speed) / 2
    camera.position.z -= speed
    snake.position.z -= speed
  }
  if (!isGameCleared) {
    const nextPanel = panels[nextPanelIndex]
    if (nextPanel) {
      if (nextPanel.z - snake.position.z > 0) {
        nextPanelIndex++
        if (nextPanel.type === 'quiz') {
          snakeLength = (snake.position.x > 0 ? nextPanel.quiz.rightAnswer : nextPanel.quiz.leftAnswer)(snakeLength)
        } else {
          snakeLength += nextPanel.reducePoint
        }
        if (nextPanel.type === 'quiz') {
          setQuestion(nextPanel.quiz.questionMathJax ?? '')
        } else {
          setQuestion('')
        }
      }
    } else if (dragon.position.z >= snake.position.z) {
      isGameCleared = true
      camera.position.setZ(2)
    }
    if (snakeLength <= 0) {
      isGameOvered = true
    }
    updateSnake(snakeLength)
    setIsGameovered(isGameOvered)
    setSnakeLength(snakeLength)
  } else {
    camera.rotation.x = 0
    camera.rotation.y = 0
    camera.rotation.z = 0
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    setSnakeLength('')
    endStep()
  }

  renderer.render(isGameCleared ? clearScene : scene, camera)

  requestAnimationFrame(step)
}

step();

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
