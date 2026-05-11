import { describe, it, expect } from 'vitest'
import {
  detectFormat,
  splitWords,
  toCamel,
  toPascal,
  toSnake,
  toConstant,
  toKebab,
  toTrain,
  toDot,
  toLower,
  toUpper,
  convertAll,
} from './case-converter.js'

// ─── detectFormat ────────────────────────────────────────────────

describe('detectFormat', () => {
  it('detects camelCase', () => {
    expect(detectFormat('helloWorld')).toBe('camel')
    expect(detectFormat('getUserNameById')).toBe('camel')
    expect(detectFormat('f')).toBe('camel')
  })

  it('detects PascalCase', () => {
    expect(detectFormat('HelloWorld')).toBe('pascal')
    expect(detectFormat('GetUserNameById')).toBe('pascal')
  })

  it('detects snake_case', () => {
    expect(detectFormat('hello_world')).toBe('snake')
    expect(detectFormat('get_user_name')).toBe('snake')
  })

  it('detects CONSTANT_CASE', () => {
    expect(detectFormat('HELLO_WORLD')).toBe('constant')
    expect(detectFormat('GET_USER_NAME')).toBe('constant')
  })

  it('detects kebab-case', () => {
    expect(detectFormat('hello-world')).toBe('kebab')
    expect(detectFormat('get-user-name')).toBe('kebab')
  })

  it('detects Train-Case', () => {
    expect(detectFormat('Hello-World')).toBe('train')
    expect(detectFormat('Get-User-Name')).toBe('train')
  })

  it('detects dot.case', () => {
    expect(detectFormat('hello.world')).toBe('dot')
    expect(detectFormat('get.user.name')).toBe('dot')
  })

  it('detects lower case', () => {
    expect(detectFormat('hello world')).toBe('lower')
    expect(detectFormat('get user name')).toBe('lower')
  })

  it('detects UPPER CASE', () => {
    expect(detectFormat('HELLO WORLD')).toBe('upper')
    expect(detectFormat('GET USER NAME')).toBe('upper')
  })

  it('handles empty and non-string', () => {
    expect(detectFormat('')).toBe('unknown')
    expect(detectFormat('   ')).toBe('unknown')
    expect(detectFormat(null)).toBe('unknown')
    expect(detectFormat(undefined)).toBe('unknown')
    expect(detectFormat(123)).toBe('unknown')
  })
})

// ─── splitWords ───────────────────────────────────────────────────

describe('splitWords', () => {
  describe('camelCase input', () => {
    it('splits multi-word camelCase', () => {
      expect(splitWords('helloWorld')).toEqual(['hello', 'World'])
      expect(splitWords('getUserNameById')).toEqual(['get', 'User', 'Name', 'By', 'Id'])
    })

    it('splits camelCase with acronyms', () => {
      expect(splitWords('getHTMLElement')).toEqual(['get', 'HTML', 'Element'])
    })

    it('handles single word camelCase', () => {
      expect(splitWords('hello')).toEqual(['hello'])
      expect(splitWords('xml')).toEqual(['xml'])
    })
  })

  describe('PascalCase input', () => {
    it('splits multi-word PascalCase', () => {
      expect(splitWords('HelloWorld')).toEqual(['Hello', 'World'])
      expect(splitWords('GetUserNameById')).toEqual(['Get', 'User', 'Name', 'By', 'Id'])
    })

    it('splits PascalCase with acronyms', () => {
      expect(splitWords('HTMLElement')).toEqual(['HTML', 'Element'])
      expect(splitWords('XMLParser')).toEqual(['XML', 'Parser'])
    })
  })

  describe('snake_case input', () => {
    it('splits snake_case', () => {
      expect(splitWords('hello_world')).toEqual(['hello', 'world'])
      expect(splitWords('get_user_name')).toEqual(['get', 'user', 'name'])
    })

    it('handles consecutive underscores', () => {
      expect(splitWords('hello__world')).toEqual(['hello', 'world'])
    })

    it('handles leading/trailing underscores', () => {
      expect(splitWords('_hello_world_')).toEqual(['hello', 'world'])
    })
  })

  describe('CONSTANT_CASE input', () => {
    it('splits CONSTANT_CASE', () => {
      expect(splitWords('HELLO_WORLD')).toEqual(['HELLO', 'WORLD'])
      expect(splitWords('GET_USER_NAME')).toEqual(['GET', 'USER', 'NAME'])
    })
  })

  describe('kebab-case input', () => {
    it('splits kebab-case', () => {
      expect(splitWords('hello-world')).toEqual(['hello', 'world'])
      expect(splitWords('get-user-name')).toEqual(['get', 'user', 'name'])
    })

    it('handles consecutive dashes', () => {
      expect(splitWords('hello--world')).toEqual(['hello', 'world'])
    })
  })

  describe('Train-Case input', () => {
    it('splits Train-Case', () => {
      expect(splitWords('Hello-World')).toEqual(['Hello', 'World'])
      expect(splitWords('Get-User-Name')).toEqual(['Get', 'User', 'Name'])
    })
  })

  describe('dot.case input', () => {
    it('splits dot.case', () => {
      expect(splitWords('hello.world')).toEqual(['hello', 'world'])
      expect(splitWords('get.user.name')).toEqual(['get', 'user', 'name'])
    })

    it('handles consecutive dots', () => {
      expect(splitWords('hello..world')).toEqual(['hello', 'world'])
    })
  })

  describe('lower case input', () => {
    it('splits lower case', () => {
      expect(splitWords('hello world')).toEqual(['hello', 'world'])
      expect(splitWords('hello  world')).toEqual(['hello', 'world'])
    })
  })

  describe('UPPER CASE input', () => {
    it('splits UPPER CASE', () => {
      expect(splitWords('HELLO WORLD')).toEqual(['HELLO', 'WORLD'])
    })
  })

  describe('numbers in input', () => {
    it('splits at digit boundaries in camelCase', () => {
      expect(splitWords('hello2World')).toEqual(['hello', '2', 'World'])
    })

    it('splits at digit boundaries in PascalCase', () => {
      expect(splitWords('Test123Case')).toEqual(['Test', '123', 'Case'])
    })
  })

  describe('edge cases', () => {
    it('handles empty and non-string', () => {
      expect(splitWords('')).toEqual([])
      expect(splitWords('   ')).toEqual([])
      expect(splitWords(null)).toEqual([])
      expect(splitWords(undefined)).toEqual([])
    })

    it('handles single character', () => {
      expect(splitWords('a')).toEqual(['a'])
      expect(splitWords('A')).toEqual(['A'])
    })
  })
})

// ─── individual converters ──────────────────────────────────────

const WORDS = ['hello', 'World']

describe('toCamel', () => {
  it('returns camelCase', () => {
    expect(toCamel(WORDS)).toBe('helloWorld')
    expect(toCamel(['get', 'user', 'name'])).toBe('getUserName')
  })

  it('handles single word', () => {
    expect(toCamel(['hello'])).toBe('hello')
  })

  it('handles empty', () => {
    expect(toCamel([])).toBe('')
  })
})

describe('toPascal', () => {
  it('returns PascalCase', () => {
    expect(toPascal(WORDS)).toBe('HelloWorld')
    expect(toPascal(['get', 'user', 'name'])).toBe('GetUserName')
  })

  it('handles single word', () => {
    expect(toPascal(['hello'])).toBe('Hello')
  })
})

describe('toSnake', () => {
  it('returns snake_case', () => {
    expect(toSnake(WORDS)).toBe('hello_world')
  })
})

describe('toConstant', () => {
  it('returns CONSTANT_CASE', () => {
    expect(toConstant(WORDS)).toBe('HELLO_WORLD')
  })
})

describe('toKebab', () => {
  it('returns kebab-case', () => {
    expect(toKebab(WORDS)).toBe('hello-world')
  })
})

describe('toTrain', () => {
  it('returns Train-Case', () => {
    expect(toTrain(WORDS)).toBe('Hello-World')
  })
})

describe('toDot', () => {
  it('returns dot.case', () => {
    expect(toDot(WORDS)).toBe('hello.world')
  })
})

describe('toLower', () => {
  it('returns lower case', () => {
    expect(toLower(WORDS)).toBe('hello world')
  })
})

describe('toUpper', () => {
  it('returns UPPER CASE', () => {
    expect(toUpper(WORDS)).toBe('HELLO WORLD')
  })
})

// ─── convertAll ───────────────────────────────────────────────────

describe('convertAll', () => {
  it('converts camelCase to all formats', () => {
    const r = convertAll('getUserNameById')
    expect(r).toEqual({
      camel: 'getUserNameById',
      pascal: 'GetUserNameById',
      snake: 'get_user_name_by_id',
      constant: 'GET_USER_NAME_BY_ID',
      kebab: 'get-user-name-by-id',
      train: 'Get-User-Name-By-Id',
      dot: 'get.user.name.by.id',
      lower: 'get user name by id',
      upper: 'GET USER NAME BY ID',
    })
  })

  it('converts snake_case to all formats', () => {
    const r = convertAll('hello_world')
    expect(r.camel).toBe('helloWorld')
    expect(r.pascal).toBe('HelloWorld')
    expect(r.snake).toBe('hello_world')
    expect(r.constant).toBe('HELLO_WORLD')
    expect(r.kebab).toBe('hello-world')
    expect(r.train).toBe('Hello-World')
    expect(r.dot).toBe('hello.world')
    expect(r.lower).toBe('hello world')
    expect(r.upper).toBe('HELLO WORLD')
  })

  it('converts CONSTANT_CASE to all formats', () => {
    const r = convertAll('HELLO_WORLD')
    expect(r.camel).toBe('helloWorld')
    expect(r.pascal).toBe('HelloWorld')
    expect(r.snake).toBe('hello_world')
    expect(r.constant).toBe('HELLO_WORLD')
    expect(r.kebab).toBe('hello-world')
    expect(r.train).toBe('Hello-World')
  })

  it('converts kebab-case to all formats', () => {
    const r = convertAll('get-user-name')
    expect(r.camel).toBe('getUserName')
    expect(r.pascal).toBe('GetUserName')
    expect(r.snake).toBe('get_user_name')
    expect(r.constant).toBe('GET_USER_NAME')
    expect(r.kebab).toBe('get-user-name')
  })

  it('converts Train-Case to all formats', () => {
    const r = convertAll('Get-User-Name')
    expect(r.camel).toBe('getUserName')
    expect(r.pascal).toBe('GetUserName')
    expect(r.snake).toBe('get_user_name')
    expect(r.train).toBe('Get-User-Name')
  })

  it('converts dot.case to all formats', () => {
    const r = convertAll('get.user.name')
    expect(r.camel).toBe('getUserName')
    expect(r.dot).toBe('get.user.name')
    expect(r.snake).toBe('get_user_name')
  })

  it('converts lower case to all formats', () => {
    const r = convertAll('get user name')
    expect(r.camel).toBe('getUserName')
    expect(r.lower).toBe('get user name')
    expect(r.upper).toBe('GET USER NAME')
  })

  it('converts UPPER CASE to all formats', () => {
    const r = convertAll('GET USER NAME')
    expect(r.camel).toBe('getUserName')
    expect(r.upper).toBe('GET USER NAME')
    expect(r.lower).toBe('get user name')
  })

  it('handles single word', () => {
    const r = convertAll('hello')
    expect(r.camel).toBe('hello')
    expect(r.pascal).toBe('Hello')
    expect(r.snake).toBe('hello')
    expect(r.constant).toBe('HELLO')
    expect(r.kebab).toBe('hello')
    expect(r.train).toBe('Hello')
    expect(r.dot).toBe('hello')
    expect(r.lower).toBe('hello')
    expect(r.upper).toBe('HELLO')
  })

  it('handles empty and non-string', () => {
    const empty = { camel: '', pascal: '', snake: '', constant: '', kebab: '', train: '', dot: '', lower: '', upper: '' }
    expect(convertAll('')).toEqual(empty)
    expect(convertAll('   ')).toEqual(empty)
    expect(convertAll(null)).toEqual(empty)
    expect(convertAll(undefined)).toEqual(empty)
    expect(convertAll(123)).toEqual(empty)
  })
})

// ─── round-trip: all formats produce consistent output ─────────

describe('round-trip consistency', () => {
  const formats = [
    { name: 'camel', separator: '', example: 'getUserNameById' },
    { name: 'snake', separator: '_', example: 'get_user_name_by_id' },
    { name: 'constant', separator: '_', example: 'GET_USER_NAME_BY_ID' },
    { name: 'kebab', separator: '-', example: 'get-user-name-by-id' },
    { name: 'train', separator: '-', example: 'Hello-World' },
    { name: 'dot', separator: '.', example: 'get.user.name.by.id' },
    { name: 'lower', separator: ' ', example: 'get user name by id' },
    { name: 'upper', separator: ' ', example: 'GET USER NAME BY ID' },
  ]

  for (const fmt of formats) {
    it(`convertAll("${fmt.example}") returns self for format "${fmt.name}"`, () => {
      const r = convertAll(fmt.example)
      expect(r[fmt.name]).toBe(fmt.example)
    })
  }
})
