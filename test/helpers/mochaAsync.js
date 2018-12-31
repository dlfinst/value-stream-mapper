
module.exports = (fn) => async () => {
  try {
    await fn()
  } catch (err) {
    throw err
  }
}