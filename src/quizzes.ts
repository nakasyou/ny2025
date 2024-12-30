export interface Quiz {
  questionMathJax?: string

  leftText: string
  rightText: string

  leftAnswer: (inp: number) => number
  rightAnswer: (inp: number) => number

  answer: 'left' | 'right'
}

export const QUIZZES: Quiz[] = [
  {
    questionMathJax: 'x=1',
    leftText: '+𝓍',
    rightText: '-𝓍',
    leftAnswer: inp => inp + 1,
    rightAnswer: inp => inp - 1,
    answer: 'left'
  }
]
