/**
 * Detect the format of a variable name string.
 * Returns one of: camel, pascal, snake, constant, kebab, train, dot, lower, upper, unknown
 */
export function detectFormat(str) {
  if (!str || typeof str !== 'string') return 'unknown'
  const s = str.trim()
  if (!s) return 'unknown'

  if (s.includes('_')) {
    return s === s.toUpperCase() ? 'constant' : 'snake'
  }
  if (s.includes('-')) {
    const words = s.split('-').filter(Boolean)
    const isTrain =
      words.length > 0 &&
      words.every((w) => w[0] >= 'A' && w[0] <= 'Z')
    return isTrain ? 'train' : 'kebab'
  }
  if (s.includes('.')) return 'dot'
  if (/\s/.test(s)) {
    return s === s.toUpperCase() ? 'upper' : 'lower'
  }

  const firstChar = s[0]
  if (firstChar >= 'A' && firstChar <= 'Z') return 'pascal'
  return 'camel'
}

/**
 * Split a variable name string into an array of words.
 * Automatically detects the format and correctly handles acronyms and numbers.
 */
export function splitWords(str) {
  if (!str || typeof str !== 'string') return []
  const s = str.trim()
  if (!s) return []

  if (s.includes('_')) {
    return s.split('_').filter(Boolean)
  }
  if (s.includes('-')) {
    return s.split('-').filter(Boolean)
  }
  if (s.includes('.')) {
    return s.split('.').filter(Boolean)
  }
  if (/\s/.test(s)) {
    return s.split(/\s+/).filter(Boolean)
  }

  // camelCase / PascalCase / flatcase
  let result = s
  // "helloWorld" → "hello World"
  result = result.replace(/([a-z])([A-Z])/g, '$1 $2')
  // "HTMLElement" → "HTML Element"
  result = result.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
  // Split letter-digit and digit-letter boundaries
  result = result.replace(/([a-zA-Z])(\d)/g, '$1 $2')
  result = result.replace(/(\d)([a-zA-Z])/g, '$1 $2')

  return result.split(/\s+/).filter(Boolean)
}

function toTitle(word) {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function toCamel(words) {
  if (!words.length) return ''
  return words.map((w, i) => (i === 0 ? w.toLowerCase() : toTitle(w))).join('')
}

export function toPascal(words) {
  return words.map((w) => toTitle(w)).join('')
}

export function toSnake(words) {
  return words.map((w) => w.toLowerCase()).join('_')
}

export function toConstant(words) {
  return words.map((w) => w.toUpperCase()).join('_')
}

export function toKebab(words) {
  return words.map((w) => w.toLowerCase()).join('-')
}

export function toTrain(words) {
  return words.map((w) => toTitle(w)).join('-')
}

export function toDot(words) {
  return words.map((w) => w.toLowerCase()).join('.')
}

export function toLower(words) {
  return words.map((w) => w.toLowerCase()).join(' ')
}

export function toUpper(words) {
  return words.map((w) => w.toUpperCase()).join(' ')
}

/**
 * Convert a string to all 9 formats at once.
 * Returns an object with format names as keys.
 */
export function convertAll(str) {
  if (!str || typeof str !== 'string' || !str.trim()) {
    return {
      camel: '',
      pascal: '',
      snake: '',
      constant: '',
      kebab: '',
      train: '',
      dot: '',
      lower: '',
      upper: '',
    }
  }

  const words = splitWords(str)
  return {
    camel: toCamel(words),
    pascal: toPascal(words),
    snake: toSnake(words),
    constant: toConstant(words),
    kebab: toKebab(words),
    train: toTrain(words),
    dot: toDot(words),
    lower: toLower(words),
    upper: toUpper(words),
  }
}
