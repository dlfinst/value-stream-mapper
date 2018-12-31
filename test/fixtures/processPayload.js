module.exports = {
  'id': 'STEP13',
  'name': 'Code Review',
  'description': 'Validating tests',
  'reprocessTime': 20,
  'processTime': 80,
  'waitTime': 120,
  'primaryPath': {
    'nextProcess': 'STEP14',
    'frequencyPct': 80
  },
  'exceptionPath': {
    'nextProcess': 'STEP12',
    'frequencyPct': 20
  }
}