const { pathToRegexp } = require("path-to-regexp")

// strip known locale prefix (e.g. /zh, /en, /pt-br) before matching
const stripLocale = (p) => p.replace(/^\/(en|zh|pt-br)(\/|$)/, '/')

describe('test pathToRegexp', () => {
  it('get right', () => {
    expect(pathToRegexp('/user').exec(stripLocale('/zh/user'))).toEqual(
      pathToRegexp('/user').exec('/user')
    )
    expect(pathToRegexp('/user').exec('/user')).toEqual(
      pathToRegexp('/user').exec('/user')
    )

    expect(pathToRegexp('/user/:id').exec(stripLocale('/zh/user/1'))).toEqual(
      pathToRegexp('/user/:id').exec('/user/1')
    )
    expect(pathToRegexp('/user/:id').exec('/user/1')).toEqual(
      pathToRegexp('/user/:id').exec('/user/1')
    )
  })
})
