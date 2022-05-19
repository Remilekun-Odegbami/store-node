const con = require('../../config/dbconfig');
const commonDao = require('../common/daoCommon')

const cartDao = {
    ...commonDao,

    table: 'cart',

    create: (req, res) => {
        if(Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No Item In Cart"
            })
        } else {
            const fields = Object.keys(req.body) // creates an array
            const values = Object.values(req.body) 

            con.execute(
                ` INSERT INTO cart SET ${fields.join(' = ?, ')} = ?`,
                values,
                (error, dbres) => {
                    if(!error) {
                        res.send(`Last id: ${dbres.insertId}`)
                    } else {
                        console.log('Cart Dao Error ', error)
                        res.send('Item not added to cart')
                    }
                }
            )
        }
    },

    update: (req, res) => {
        if(isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number."
            })
        } else if(Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No item in cart"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `UPDATE cart SET ${fields.join(' = ?, ')} = ? WHERE User_id = ?`,
                [...values, req.params.id],
                (error, dbres) => {
                    if(!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`)
                    } else {
                        console.log('Cart DAO ERROR ', error)
                        res.send('Error updating record')
                    }
                }
            )
        }
    },

    sort: (req, res) => {
        con.execute(
            `SELECT * FROM contact ORDER BY TimeUploaded, DateUploaded`,
            [req.body],
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('CART DAO ERROR ', error)
                }
            }
        )
    }
}

module.exports = cartDao;