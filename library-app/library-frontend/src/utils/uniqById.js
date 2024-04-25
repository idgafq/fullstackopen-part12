export const uniqById = (a) => {
  let seen = new Set()
  return a.filter((item) => {
    let k = item.id
    return seen.has(k) ? false : seen.add(k)
  })
}

export default uniqById