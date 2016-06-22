import * as geoIp from '../geoIp'
import * as util from '../util'
import db from 'sequelize-context'
import express from 'express'
import Pusher from 'pusher'

const router = express.Router()

async function triggerNewVoteEvent () {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    encrypted: true
  })
  const results = await db.models.vote.getResults()
  pusher.trigger('mainChannel', 'newVote', results)
}

function createErrorResponse (error) {
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map(error => ({
      message: error.message,
      field: error.path
    }))
    return {
      status: 403,
      json: {
        errors
      }
    }
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return {
      status: 409,
      json: {
        message: 'You have already voted on this poll'
      }
    }
  }
}

router.post('/api/votes', async function (req, res, next) {
  try {
    const voterCountry = await geoIp.fetchCountry(req.ip)
    await db.models.vote.create({
      voterIp: req.ip,
      voteFor: util.capitalizeWords(req.body.voteFor),
      voterCountry
    })
    await triggerNewVoteEvent()
    res.sendStatus(201)
  } catch (error) {
    const errorRes = createErrorResponse(error)
    if (errorRes) {
      res.status(errorRes.status).json(errorRes.json)
    } else {
      next(error)
    }
  }
})

export default router
