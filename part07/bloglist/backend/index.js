const http = require('http')
const express = require('express')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = config.PORT || 3004
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
