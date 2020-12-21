const router = require('express').Router()
const {User} = require('../db/models')
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

router.post('/seed', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    createNewUser(user, req.body.socketId)

    res.status(200).send('ok')
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
