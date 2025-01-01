const mathQuestionElem = document.getElementById('math-question') as HTMLDivElement
const snakeLengthElem = document.getElementById('snake-length') as HTMLDivElement
const gameoverContainer = document.getElementById('gameover-container') as HTMLDivElement
const messageElem = document.getElementById('message') as HTMLDivElement
const messageContainerElem = document.getElementById('message-container') as HTMLDivElement

let lastQ = ''
export const setQuestion = (question: string) => {
  if (lastQ !== question) {
    mathQuestionElem.innerHTML = `${question}`
    // @ts-ignore
    MathJax.typeset([mathQuestionElem])
  }
  lastQ = question
}
export const setSnakeLength = (l: number | string) => {
  snakeLengthElem.textContent = l.toString()
}
export const setIsGameovered = (gameovered: boolean) => {
  gameoverContainer.style.display = !gameovered ? 'none' : 'grid'
}
export const setMessage = (text: string) => {
  messageContainerElem.style.display = 'grid'
  messageElem.textContent = text
}
