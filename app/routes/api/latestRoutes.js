const express = require('express')
const router = express.Router()

const { latestDao: dao } = require('../../daos/dao') 

// api/latest
router.get('/', (req, res) => {
    dao.findAll(res, dao.table)
})

// api/latest/count
router.get('/count', (req, res) => {
    dao.countAll(res, dao.table)
})

router.get('/sort', (req, res) => {
    dao.sort(req, res)
})

router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id)
})


router.post('/create', (req, res) => {
    dao.create(req, res)
})

router.patch('/update/:id', (req, res) => {
    dao.update(req, res)
})

module.exports = router
