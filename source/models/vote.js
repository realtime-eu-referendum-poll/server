import db from 'sequelize-context'

const falseIfInProduction = () => !trueIfInProduction()
const trueIfInProduction = () => process.env.NODE_ENV === 'production'

module.exports = function createVoteModel ({connection, Sequelize}) {
  const vote = connection.define('vote', {
    voterIp: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: trueIfInProduction(),
      validate: {
        isIP: true
      }
    },
    voterCountry: {
      type: Sequelize.STRING,
      allowNull: falseIfInProduction()
    },
    voteFor: {
      type: Sequelize.STRING,
      validate: {
        isIn: {
          args: [['Remain', 'Leave']],
          msg: 'Invalid option. Your only options are to remain or leave!'
        }
      }
    },
    submittedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      async getResults () {
        const {rows, count} = await db.models.vote.findAndCountAll({
          attributes: [
            [db.connection.fn('COUNT', db.connection.literal('CASE WHEN `voteFor` = \'Remain\' THEN 1 END')), 'remainCount'],
            [db.connection.fn('COUNT', db.connection.literal('CASE WHEN `voteFor` = \'Leave\' THEN 1 END')), 'leaveCount']
          ]
        })
        if (rows.length > 0) {
          const row = rows.shift()
          return {
            remainCount: row.dataValues.remainCount,
            leaveCount: row.dataValues.leaveCount,
            totalCount: count
          }
        }
        return {
          remainCount: 0,
          leaveCount: 0,
          totalCount: 0
        }
      }
    }
  })
  return vote
}
