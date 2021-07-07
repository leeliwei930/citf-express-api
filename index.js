const express = require('express')
const process = require('process')
const {
    generateDocs,
    nationStats,
    latestNationStats,
    stateStatistic,
    latestStateStatistic,
    latestLocalVaccinationRegStatistic,
    localVaccinationRegStatistic,
    latestStateVaccinationRegStatistic,
    stateVaccinationRegStatistic,
    getPopulationByState
} = require('./handlers')
const { getStateLatestVaccinationStatistic } = require('./provider')

require('dotenv').config();

let server = express()
server.get('/', generateDocs)
let router = express.Router()
router.get('/docs', generateDocs)
router.get('/malaysia', nationStats)
router.get('/malaysia/latest', latestNationStats)
router.get('/malaysia/registration/', localVaccinationRegStatistic)
router.get('/malaysia/registration/latest', latestLocalVaccinationRegStatistic)
router.get('/state/registration/:state/', stateVaccinationRegStatistic)
router.get('/state/registration/:state/latest', latestStateVaccinationRegStatistic)
router.get('/state/:state', stateStatistic)
router.get('/state/:state/latest', latestStateStatistic)
router.get('/population/:state', getPopulationByState)
server.use("/api/vaccination/stats", router)

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server listening on port ${process.env.EXPRESS_PORT}`)
    console.log(`For docs please navigate to /api/vaccination/stats/docs path`)
})
