const mathQuestionElem = document.getElementById('math-question') as HTMLDivElement

export const setQuestion = (question: string) => {
  mathQuestionElem.innerHTML = `\\(${question}\\)`
  MathJax.typeset([mathQuestionElem])
}
