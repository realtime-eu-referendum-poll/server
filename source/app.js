import bodyParser from 'body-parser'
import express from 'express'
import getResultsRoute from './routes/getResultsRoute'
import postVoteRoute from './routes/postVoteRoute'

const app = express()

app.use(function enableCors (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use(bodyParser.json())
app.use(postVoteRoute)
app.use(getResultsRoute)

export default app
