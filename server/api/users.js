const router = require('express').Router()
const {User} = require('../db/models')
const socket = require('../socket')
const {createNewUser} = require('../../script/seedNewUser')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

const sendMessage = (type, message) => {
  if (socket.getIO()) {
    socket.getIO().emit(type, message)
  }
}

router.post('/seed', async (req, res, next) => {
  console.log('seed route')
  console.log(req.body)
  try {
    const user = await User.create(req.body)

    createNewUser(user)
    // sendMessage('startSeeding')
    // sendMessage('loginOK', 'ok')

    //setTimeout(() => {sendMessage('loginOK', 'ok')}, 1000)
    res.status(200).send('ok')

    //req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
