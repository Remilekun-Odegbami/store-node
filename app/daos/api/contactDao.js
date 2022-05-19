const req = require('express/lib/request');
const con = require('../../config/dbconfig');
const daoCommon = require('../common/daoCommon');

const contactDao = {
    ...daoCommon,

    table: 'contact',

    create: (req, res) => {
        if(Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "Please fill all fields"
            })
        } else {
            const fields = Object.keys(req.body) // creates an array
            const values = Object.values(req.body) 

            con.execute(
                ` INSERT INTO contact SET ${fields.join(' = ?, ')} = ?`,
                values,
                (error, dbres) => {
                    if(!error) {
                        res.send(`Last id: ${dbres.insertId}`)
                    } else {
                        console.log('Contact Dao Error ', error)
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
                `UPDATE contact SET ${fields.join(' = ?, ')} = ? WHERE User_id = ?`,
                [...values, req.params.id],
                (error, dbres) => {
                    if(!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`)
                    } else {
                        console.log('CONTACT DAO ERROR ', error)
                        res.send('Error updating record')
                    }
                }
            )
        }
    },

    sort: (req, res) => {
        con.execute(
            `SELECT * FROM contact ORDER BY FName, LName`,
            [req.body],
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('CONTACT DAO ERROR ', error)
                }
            }
        )
    },

    post: (req, res) => {
        let sql = "INSERT INTO contact values(null, '"+ req.body.fName + "', '"+ req.body.lName + "', "+ req.body.num + ", '"+ req.body.email + "', '"+ req.body.address + "','"+ req.body.address2 + "', '"+ req.body.zip + "', '"+ req.body.msg + "' )"

        con.query(sql, (err) => {
            if (err) throw err
        })

        res.render({title:"Data saved", message: "data saved successfully"})
    }
}

module.exports = contactDao;