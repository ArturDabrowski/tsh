const fieldRules = /^[a-z0-9\-_]+$/

const validator = userName => {
  if (!fieldRules.test(userName)) {
    return 'Not valid'
  }
  return null
}

export { validator }
