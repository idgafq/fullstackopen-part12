const express = require('express')
const redis = require('../redis')
const router = express.Router()

router.get('/', async (req, res) => {
  const count = await redis.getAsync('added_todos')
  const parsedCount = count ? parseInt(count) : 0

  res.json({ added_todos: parsedCount })
})

module.exports = router