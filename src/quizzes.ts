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
    leftText: '×50',
    rightText: '÷2',
    leftAnswer: i => 50 * i,
    rightAnswer: i => i / 2,
    answer: 'left'
  },
  {
    questionMathJax: '\\(x=500\\)',
    leftText: '+𝓍',
    rightText: '-𝓍',
    leftAnswer: inp => inp + 500,
    rightAnswer: inp => inp - 500,
    answer: 'left'
  },
  {
    questionMathJax: '\\(x=2^6\\)',
    leftText: '-𝓍',
    rightText: '+𝓍',
    leftAnswer: inp => inp - 64,
    rightAnswer: inp => inp + 64,
    answer: 'right'
  },
  {
    questionMathJax: '\\(x^2-36=x\\)<br>\\(y^2=121\\)<br>\\((x>0, y>0)\\)',
    leftText: '+𝓍',
    rightText: '+𝓎',
    leftAnswer: inp => inp + 36,
    rightAnswer: inp => inp + 121,
    answer: 'right'
  },
  {
    questionMathJax: '\\(x=100y\\)<br>\\(x=20y+8\\)',
    leftText: '×𝓍',
    rightText: '×𝓎',
    leftAnswer: i => i * 10,
    rightAnswer: i => i / 10,
    answer: 'left'
  },
  {
    leftText: '×2',
    rightText: '×4',
    leftAnswer: i => i * 2,
    rightAnswer: i => i * 4,
    answer: 'right'
  },
  {
    questionMathJax: '\\(x=(3\\sqrt(263))^2\\)<br>\\(y=-2366\\)',
    leftText: '+x',
    rightText: '+x+y',
    leftAnswer: i => i + 2367,
    rightAnswer: i => i + 2367 + (-2366),
    answer: 'left'
  }
]
