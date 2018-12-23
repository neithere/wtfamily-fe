export const requireNonEmptyObjectValues = variables => {
  Object.keys(variables).forEach(k => {
    const value = variables[k]

    console.log('validating', { k, value })

    if (!value) {
      throw Error(k + ' must be defined')
    }

    if (Array.isArray(value) && value.length === 0) {
      throw Error(k + ' cannot be an empty array')
    }
  })
}
