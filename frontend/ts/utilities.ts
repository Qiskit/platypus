const mergeJson = function (target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (Array.isArray(target[key])) {
      const merged = [...target[key], ...source[key]]
      target[key] = [...new Set(merged)]
    } else if (target[key] instanceof Object) {
      const mergedJsons = mergeJson(target[key], source[key])
      Object.assign(source[key], mergedJsons)
    } else {
      Object.assign(target, {
        [key]: source[key]
      })
    }
  }
  return target
}

const randomValue = function (min: number, max: number, step: number = 0.000001) {
  const rnd = Math.random()
  const rangedRandom = rnd * (max - min) + min

  return Math.round(rangedRandom / step) * step
}

export {
  mergeJson,
  randomValue
}
