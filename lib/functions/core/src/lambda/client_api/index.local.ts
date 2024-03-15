import app from './app'

const PORT = 8000

app.listen(PORT, function () {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  console.log('App started on port ' + PORT)
})
