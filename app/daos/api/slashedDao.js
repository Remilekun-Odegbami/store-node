const con = require('../../config/dbconfig');
const commonDao = require('../common/daoCommon');

const slashedDao = {
    ...commonDao,
    
    table: 'slashedProduct',

    create: (req, res) => {
        if(Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "Product(s) not added"
            })
        } else {
            const fields = Object.keys(req.body) // creates an array
            const values = Object.values(req.body) 

            con.execute(
                ` INSERT INTO product SET ${fields.join(' = ?, ')} = ?`,
                values,
                (error, dbres) => {
                    if(!error) {
                        res.send(`Last id: ${dbres.insertId}`)
                    } else {
                        console.log('Slashed Product Dao Error ', error)
                        res.send('Message not sent')
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
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `UPDATE product SET ${fields.join(' = ?, ')} = ? WHERE ProductId = ?`,
                [...values, req.params.id],
                (error, dbres) => {
                    if(!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`)
                    } else {
                        console.log('SLASHED PRODUCT DAO ERROR ', error)
                        res.send('Error updating record')
                    }
                }
            )
        }
    },

    sort: (req, res) => {
        con.execute(
            `SELECT * FROM slashedProduct ORDER BY ProductName, Rating`,
            [req.body],
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('SLASHED PRODUCT DAO ERROR ', error)
                }
            }
        )
    }
}

module.exports = slashedDao;