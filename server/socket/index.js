let _io

const setup = io => {
  _io = io
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
  })
}

module.exports = {
  setup,
  getIO: () => _io
}
