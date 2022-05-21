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

const latestDao = {
    ...daoCommon,
    ...require('./api/latestDao')
}

const slashedDao = {
    ...daoCommon,
    ...require('./api/slashedDao')
}

module.exports = {
    contactDao,
    productsDao,
    cartDao,
    latestDao,
    slashedDao
}