// eslint-disable-next-line import/named
import { multiply, subtract, add, gcd, flatten, map, round } from 'mathjs'

export enum GateName {
  UNKNOWN = 'UNKNOWN',
  ID = 'ID',
  H = 'H',
  Z = 'Z',
  X = 'X',
  Y = 'Y',
  T = 'T',
  S = 'S',
  RX = 'RX',
  RZ = 'RZ',
  RY = 'RY',
  MEASURE_Z = 'Measure'
}

function neg (m: number[][]) {
  return multiply(m, -1)
}
export interface StateMatrix {
  A: number[][]
  B: number[][]
  C: number[][]
  D: number[][]
  m: number
}

function reduce (state: StateMatrix) {
  const { A, B, C, D, m } = state
  const matricesValues = flatten([...A, ...B, ...C, ...D]) as unknown as number[]
  const d = gcd(...matricesValues, Math.pow(2, m))

  return {
    A: map(A, value => round(value / d)),
    B: map(B, value => round(value / d)),
    C: map(C, value => round(value / d)),
    D: map(D, value => round(value / d)),
    m: round(m / d)
  }
}

function reduceSingleElement (numerator: number, denominator: number) {
  const d = gcd(numerator, denominator)

  return {
    numerator: round(numerator / d),
    denominator: round(denominator / d)
  }
}

export function IdentityState (): StateMatrix {
  return {
    A: [[1, 0], [0, 1]],
    B: [[0, 0], [0, 0]],
    C: [[0, 0], [0, 0]],
    D: [[0, 0], [0, 0]],
    m: 0
  }
}

export interface QuantumGate {
  apply (state: StateMatrix): StateMatrix
}

export const Identity: QuantumGate = {
  apply (state: StateMatrix) {
    return state
  }
}

export const XGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[0, 1], [1, 0]]
    return reduce({
      A: multiply(K, state.A),
      B: multiply(K, state.B),
      C: multiply(K, state.C),
      D: multiply(K, state.D),
      m: state.m
    })
  }
}

export const YGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[0, -1], [1, 0]]

    return reduce({
      A: neg(multiply(K, state.B)),
      B: multiply(K, state.A),
      C: neg(multiply(K, state.D)),
      D: multiply(K, state.C),
      m: state.m
    })
  }
}

export const ZGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[1, 0], [0, -1]]

    return reduce({
      A: multiply(K, state.A),
      B: multiply(K, state.B),
      C: multiply(K, state.C),
      D: multiply(K, state.D),
      m: state.m
    })
  }
}

export const HGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[1, 1], [1, -1]]

    return reduce({
      A: multiply(multiply(K, state.C), 2),
      B: multiply(multiply(K, state.D), 2),
      C: multiply(K, state.A),
      D: multiply(K, state.B),
      m: state.m + 1
    })
  }
}

export const SGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K1 = [[1, 0], [0, 0]]
    const K2 = [[0, 0], [0, 1]]

    return reduce({
      A: subtract(multiply(K1, state.A), multiply(K2, state.B)),
      B: add(multiply(K2, state.A), multiply(K1, state.B)),
      C: subtract(multiply(K1, state.C), multiply(K2, state.D)),
      D: add(multiply(K1, state.C), multiply(K1, state.D)),
      m: state.m
    })
  }
}

export const TGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K1 = [[2, 0], [0, 0]]
    const K2 = [[0, 0], [0, 1]]

    const K1_A = multiply(K1, state.A)
    const K1_B = multiply(K1, state.B)
    const K1_C = multiply(K1, state.C)
    const K1_D = multiply(K1, state.D)
    const K2_A = multiply(K2, state.A)
    const K2_B = multiply(K2, state.B)
    const K2_C = multiply(K2, state.C)
    const K2_D = multiply(K2, state.D)
    const K2_C_2 = multiply(K2_C, 2)
    const K2_D_2 = multiply(K2_D, 2)

    return reduce({
      A: subtract(add(K1_A, K2_C_2), K2_D_2),
      B: add(add(K1_B, K2_C_2), K2_D_2),
      C: add(subtract(K2_A, K2_B), K1_C),
      D: add(add(K2_A, K2_B), K1_D),
      m: state.m + 1
    })
  }
}

export const gateMap = {
  [GateName.UNKNOWN]: Identity,
  [GateName.ID]: Identity,
  [GateName.MEASURE_Z]: Identity,
  [GateName.H]: HGate,
  [GateName.X]: XGate,
  [GateName.Y]: YGate,
  [GateName.Z]: ZGate,
  [GateName.T]: TGate,
  [GateName.S]: SGate,
  [GateName.RX]: Identity,
  [GateName.RY]: Identity,
  [GateName.RZ]: Identity
}

function signedString (n: number, m: number, symbol: string = '') {
  if (n === 0) {
    return ''
  }
  const { numerator, denominator } = reduceSingleElement(n, Math.pow(2, m))

  const absNumerator = Math.abs(numerator)
  const sign = numerator > 0 ? '+' : '-'
  let numeratorTex = ''

  if (symbol) {
    numeratorTex = `${absNumerator > 1 ? absNumerator : ''}${symbol}`
  } else {
    numeratorTex = `${absNumerator}`
  }

  if (m > 0) {
    return `${sign}\\frac{${numeratorTex}}{${denominator}}`
  } else {
    return `${sign}${numeratorTex}`
  }
}

function StateMatrixElementToTex (state: StateMatrix, coords: { x: number, y: number }) {
  const { x, y } = coords
  const [a, b, c, d] = [state.A[x][y], state.B[x][y], state.C[x][y], state.D[x][y]]
  const isZero = (a * a + b * b + c * c + d * d) === 0

  if (isZero) {
    return '0'
  }

  let tex = `${signedString(a, state.m)}${signedString(b, state.m, 'i')}${signedString(c, state.m, '\\sqrt{2}')}${signedString(d, state.m, 'i\\sqrt{2}')}`

  if (tex.startsWith('+')) {
    tex = tex.substring(1)
  }

  return tex
}

export function StateMatrixToTexMatrix (state: StateMatrix) {
  return `
    \\begin{bmatrix}
      ${StateMatrixElementToTex(state, { x: 0, y: 0 })} & ${StateMatrixElementToTex(state, { x: 0, y: 1 })}\\\\
      ${StateMatrixElementToTex(state, { x: 1, y: 0 })} & ${StateMatrixElementToTex(state, { x: 1, y: 1 })}
    \\end{bmatrix}
  `
}

const ZERO_KET = '|0\\rangle'
const ONE_KET = '|1\\rangle'

export function StateMatrixToTexKetNotation (state: StateMatrix) {
  const zeroKetValue = StateMatrixElementToTex(state, { x: 0, y: 0 })
  const oneKetValue = StateMatrixElementToTex(state, { x: 1, y: 0 })

  let zeroKetTex = ''
  let oneKetTex = ''
  const bothKets = zeroKetValue !== '0' && oneKetValue !== '0'

  if (zeroKetValue !== '0') {
    zeroKetTex = `${bothKets ? '(' : ''}${zeroKetValue === '1' ? '' : zeroKetValue}${ZERO_KET}${bothKets ? ')' : ''}`
  }

  if (oneKetValue !== '0') {
    oneKetTex = `${bothKets ? '(' : ''}${oneKetValue === '1' ? '' : oneKetValue}${ONE_KET}${bothKets ? ')' : ''}`
  }

  let joinTex = ''
  if (bothKets && !oneKetTex.startsWith('-')) {
    joinTex = '+'
  }

  return `
    ${zeroKetTex}${joinTex}${oneKetTex}
  `
}
