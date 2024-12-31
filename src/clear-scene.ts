import { Scene, Color, PlaneGeometry, MeshBasicMaterial, Mesh, CompressedTextureLoader } from "three"
import { createSnakeEmoji } from "./components/snake-emoji"
import { createDragon } from "./components/dragon"
import { degToRad } from "./lib/rad"
import { createTextTexture } from "./lib/text-image"
import confetti from 'canvas-confetti'
import { createFuji } from "./components/fuji"
import { setMessage } from "./lib/display"

const scene = new Scene()
scene.background = new Color(0x87CEEB)
export default scene

const snake = createSnakeEmoji()
const dragon = createDragon()
snake.material.opacity = 0.8
dragon.material.opacity = 0.8
snake.position.setZ(-50)
dragon.position.setZ(-50)
snake.rotation.y = degToRad(50)
dragon.rotation.y = degToRad(-50)
snake.position.y = 30
dragon.position.y = 30

scene.add(snake, dragon)

const createTextMesh = (n: number) => {
  const {texture, aspect} = createTextTexture(n.toString(), 100, 'black')
  const textGeometry = new PlaneGeometry(aspect * 3, 3)
  const textMaterial = new MeshBasicMaterial({ map: texture, transparent: true })
  const textMesh = new Mesh(textGeometry, textMaterial)
  return textMesh
}
let snakeN = 2024 + 2025
let dragonN = 2024
let snakeText = createTextMesh(snakeN)
let dragonText = createTextMesh(dragonN)
let i = 0
let isEnded = false

const taka = confetti.shapeFromText({ text: '🦅', scalar: 10 })
const nasu = confetti.shapeFromText({ text: '🍆', scalar: 10 })


const fuji = createFuji()
fuji.position.y = -20
scene.add(fuji)
export const endStep = () => {
  i ++
  fuji.rotation.y += degToRad(1)
  if (dragonN === 0) {
    dragon.removeFromParent()
    dragonText.removeFromParent()
    if (!isEnded) {
      isEnded = true
      i = 0
    }
    if (i < 60) {
      snake.rotation.y -= degToRad(50 / 60)
      snake.material.opacity += 0.1
    } else if (i < 120) {
      const ti = i - 60
      snakeText.scale.set(ti * 0.1, ti * 0.1, ti * 0.1)
      snakeText.position.x += (-snakeText.position.x) / 2
      fuji.position.y = -15 + (ti / 6)
    } else if (i < 240) {
      setMessage(new URL(location.href).searchParams.get('m') ?? '')
    }
    if (i === 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      document.body.onclick = document.querySelector<HTMLCanvasElement>('#main-canvas')!.onclick = (evt) => {
        console.log(evt)
        confetti({
          particleCount: 10,
          origin: {
            x: evt.screenX / window.innerWidth,
            y: evt.screenY / window.innerHeight
          },
          spread: 70,
          shapes: [taka, nasu],
        })
      }
    }
  } else {
    if (i > 60) {
      snakeN -= 8
      dragonN -= 8
    }

    snakeText.removeFromParent()
    dragonText.removeFromParent()
    snakeText = createTextMesh(snakeN)
    dragonText = createTextMesh(dragonN)
    scene.add(snakeText, dragonText)

    const progress = (2024 - dragonN) / 2024
    snake.position.x = (1 - progress) * -5
    dragon.position.x = (1 - progress) * 5
    const sizeRate = 1 / 2000
    snake.scale.set(snakeN * sizeRate, snakeN * sizeRate, snakeN * sizeRate)
    dragon.scale.set(dragonN * sizeRate, dragonN * sizeRate, dragonN * sizeRate)

    snakeText.position.x = snake.position.x * 1.5 - 2
    snakeText.position.y = 20
    snakeText.position.z = snake.position.z + 10
    dragonText.position.x = dragon.position.x * 1.5 + 2
    dragonText.position.y = 20
    dragonText.position.z = dragon.position.z + 10

  }
}
