// eslint-disable-next-line import/named
import { multiply, subtract, add } from 'mathjs'

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

const mult = multiply
const sub = subtract
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
    // Integer part
    return state
  }
}

export const XGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[0, 1], [1, 0]]
    return {
      A: mult(K, state.A),
      B: mult(K, state.B),
      C: mult(K, state.C),
      D: mult(K, state.D),
      m: state.m
    }
  }
}

export const YGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[0, -1], [1, 0]]

    return {
      A: neg(mult(K, state.B)),
      B: mult(K, state.A),
      C: neg(mult(K, state.D)),
      D: mult(K, state.C),
      m: state.m
    }
  }
}

export const ZGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[1, 0], [0, -1]]

    return {
      A: mult(K, state.A),
      B: mult(K, state.B),
      C: mult(K, state.C),
      D: mult(K, state.D),
      m: state.m
    }
  }
}

export const HGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K = [[1, 1], [1, -1]]

    return {
      A: mult(mult(K, state.C), 2),
      B: mult(mult(K, state.D), 2),
      C: mult(K, state.A),
      D: mult(K, state.B),
      m: state.m + 1
    }
  }
}

export const SGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K1 = [[1, 0], [0, 0]]
    const K2 = [[0, 0], [0, 1]]

    return {
      A: sub(mult(K1, state.A), mult(K2, state.B)),
      B: add(mult(K2, state.A), mult(K1, state.B)),
      C: sub(mult(K1, state.C), mult(K2, state.D)),
      D: add(mult(K1, state.C), mult(K1, state.D)),
      m: state.m
    }
  }
}

export const TGate: QuantumGate = {
  apply (state: StateMatrix) {
    // Integer part
    const K1 = [[2, 0], [0, 0]]
    const K2 = [[0, 0], [0, 1]]

    const K1_A = mult(K1, state.A)
    const K1_B = mult(K1, state.B)
    const K1_C = mult(K1, state.C)
    const K1_D = mult(K1, state.D)
    const K2_A = mult(K2, state.A)
    const K2_B = mult(K2, state.B)
    const K2_C = mult(K2, state.C)
    const K2_D = mult(K2, state.D)
    const K2_C_2 = mult(K2_C, 2)
    const K2_D_2 = mult(K2_D, 2)

    return {
      A: sub(add(K1_A, K2_C_2), K2_D_2),
      B: add(add(K1_B, K2_C_2), K2_D_2),
      C: add(sub(K2_A, K2_B), K1_C),
      D: add(add(K2_A, K2_B), K1_D),
      m: state.m + 1
    }
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

function signedString (value: number, symbol: string) {
  if (value === 0) {
    return ''
  }

  const absValue = Math.abs(value)
  return `${value > 0 ? '+' : '-'}${absValue > 1 ? absValue : ''}${symbol}`
}

function StateMatrixElementToTex (state: StateMatrix, coords: { x: number, y: number }) {
  const { x, y } = coords
  const [a, b, c, d] = [state.A[x][y], state.B[x][y], state.C[x][y], state.D[x][y]]
  const isZero = (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) + Math.pow(d, 2)) === 0

  if (isZero) {
    return '0'
  }

  let tex = ''

  if (a !== 0) {
    tex = `${tex}${a}`
  }

  tex = `${tex}${signedString(b, 'i')}${signedString(c, '\\sqrt{2}')}${signedString(d, 'i\\sqrt{2}')}`

  if (tex.startsWith('+')) {
    tex = tex.substring(1)
  }

  if (state.m > 0) {
    tex = `\\frac{${tex}}{${Math.pow(2, state.m)}}`
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
  if (zeroKetValue !== '0') {
    zeroKetTex = `${zeroKetValue === '1' ? '' : zeroKetValue}${ZERO_KET}`
  }

  if (oneKetValue !== '0') {
    oneKetTex = `${oneKetValue === '1' ? '' : oneKetValue}${ONE_KET}`
  }

  let joinTex = ''
  if (zeroKetTex && oneKetTex && !oneKetTex.startsWith('-')) {
    joinTex = '+'
  }

  return `
    ${zeroKetTex}${joinTex}${oneKetTex}
  `
}
