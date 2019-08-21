/**
 * Simple function to pretty print an array of strings or objects
 * @param {array} data
 * @param {string} propertyName
 */
export function prettyPrint(data, propertyName) {
  if (propertyName) {
    return data.map((item, index) => {
      if (index === data.length - 1) return `${item[propertyName]}`
      else return `${item[propertyName]}, `
    })
  } else {
    return data.map((item, index) => {
      if (index === data.length - 1) return `${item}`
      else return `${item}, `
    })
  }
}
