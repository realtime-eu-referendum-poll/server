require('dotenv').config()

import db from 'sequelize-context'
import app from './app'

(async function () {
  try {
    await db.connect('./source/models/*.js', {
      force: true,
      dialect: 'sqlite',
      logging: false,
      storage: './bin/database.sqlite'
    })
  } catch (error) {
    console.log(`An error occurd when initializing the db: ${error}`)
    return
  }
  const port = 3000
  app.listen(port, () => console.log(`Running on port ${port}`))
})()
