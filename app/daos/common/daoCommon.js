// connect to database
const con = require('../../config/dbconfig')

const daoCommon = {
    findAll: (res, table) => {
        con.execute(
            `SELECT * FROM ${table}`, (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO COMMON ERROR ', error)
                }
            }
        )
    },

    findById: (res, table, id) => {
        con.execute(
            `SELECT * FROM ${table} WHERE ${table}Id = ${id}`,
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO COMMON ERROR ', error)
                }
            }
        )
    },

    countAll: (res, table) => {
        con.execute(
            `SELECT COUNT(*) count FROM ${table}`,
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO COMMON ERROR ', error)
                }
            }
        )
    }
}

module.exports = daoCommon;