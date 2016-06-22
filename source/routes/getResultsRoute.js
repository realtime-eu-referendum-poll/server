import db from 'sequelize-context'
import express from 'express'

const router = express.Router()

router.get('/api/results', async function (req, res, next) {
  const results = await db.models.vote.getResults()
  res.json(results)
})

module.exports = router
