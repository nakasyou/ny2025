import {
  Group,
  BoxGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry
} from "three"

import { createTextTexture } from "../lib/text-image"
import { Quiz } from "../quizzes"


const createQuizPanelPeace = (label: string, color: number) => {
  const group = new Group()

  const bgGeometry = new BoxGeometry(2.5, 3, 0.1)
  const bgMaterial = new MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.2,
    depthWrite: false
  })
  const bgMesh = new Mesh(bgGeometry, bgMaterial)

  const { texture, aspect } = createTextTexture(label, 100, 'black')
  const textGeometry = new PlaneGeometry(aspect, 1)
  const textMaterial = new MeshBasicMaterial({
    map: texture,
    transparent: true
  })
  const textMesh = new Mesh(textGeometry, textMaterial)
  textMesh.position.y = 1

  group.add(bgMesh)
  group.add(textMesh)

  return group
}
export const createQuizPanel = (quiz: Quiz) => {
  const group = new Group()

  const a = createQuizPanelPeace(quiz.leftText, 0xff0000)
  const b = createQuizPanelPeace(quiz.rightText, 0x00ff00)

  a.position.x = -1.25
  b.position.x = 1.25

  group.add(a, b)

  return group
}
export const createReducePanel = (reducePoint: number) => {
  const group = new Group()

  const bgGeometry = new BoxGeometry(5, 3, 0.1)
  const bgMaterial = new MeshBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
  })
  const bgMesh = new Mesh(bgGeometry, bgMaterial)

  const { texture, aspect } = createTextTexture(`${reducePoint}`, 100, 'black')
  const textGeometry = new PlaneGeometry(aspect, 1)
  const textMaterial = new MeshBasicMaterial({ map: texture, transparent: true })
  const textMesh = new Mesh(textGeometry, textMaterial)
  textMesh.position.y = 1

  group.add(bgMesh)
  group.add(textMesh)

  return group
}
