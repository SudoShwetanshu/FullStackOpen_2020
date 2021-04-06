const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const body = req.body
  if (!(req.body.password.length > 3)) {
    return res.status(400).json({ error: 'Minimum Password Length Should be 3!' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = userRouter
