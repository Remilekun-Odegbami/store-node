const daoCommon = require('./common/daoCommon')

const contactDao = {
    ...daoCommon,
    ...require('./api/contactDao')
}

const productsDao = {
    ...daoCommon,
    ...require('./api/productsDao')
}

const cartDao = {
    ...daoCommon,
    ...require('./api/cartDao')
}

module.exports = {
    contactDao,
    productsDao,
    cartDao
}