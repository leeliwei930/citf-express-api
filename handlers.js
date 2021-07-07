const provider = require('./provider')
module.exports = {
    async nationStats(req, res) {
        try {
            let params = {}
            if (req.query.start_date) {
               params.start_date = req.query.start_date
            }
             if (req.query.end_date) {
               params.end_date = req.query.end_date
             }
           let data = await provider.getMalaysiaVaccinationStatistic(params);
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async latestNationStats(req, res) {
        try {
            let data = await provider.getMalaysiaLatestVaccinationStatistic();
            
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async stateStatistic(req, res) {
        try {
            let params = {}
            if (req.query.start_date) {
               params.start_date = req.query.start_date
            }
             if (req.query.end_date) {
               params.end_date = req.query.end_date
             }
            let data = await provider.getStateVaccinationStatistic({
                state: req.params.state,
                ...params
            });
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async latestStateStatistic(req, res) {
         try {
        
            let data = await provider.getStateLatestVaccinationStatistic({
                state: req.params.state,
            });
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    
    generateDocs(req, res) {
        let hostname = `${req.protocol}://${req.hostname}`
        function endpoint(hostname, path) {
            return `${hostname}/api/vaccination/stats${path}`
        }
        let docs = [
            {
                "name": "Retrieve latest vaccination statistic based on nation",
                "path" : `${endpoint(hostname, "/malaysia/latest" )}`
            },
            {
                "name": "Perform date scope query on Malaysia vaccination statistic",
                "path": `${endpoint(hostname, "/malaysia?start_date=2021-02-25&end_date=2021-04-01" )}`
            },

            {
                "name": "Retrieve the latest local vaccination registration statistic",
                "path" : `${endpoint(hostname, "/malaysia/registration/latest" )}`
            },
            {
                "name": "Perform date scope query on Malaysia vaccination registration statistic",
                "path": `${endpoint(hostname, "/malaysia/registration?start_date=2021-02-25&end_date=2021-04-01" )}`
            },
            {
                "name": "Retrieve latest vaccination registration statistic based on state",
                "path": `${endpoint(hostname, "/state/registration/:state/latest")}`,
                "params": {
                    "state": {
                        "options": [
                            "Johor",
                            "Kedah",
                            "Kelantan",
                            "Melaka",
                            "Negeri Sembilan",
                            "Pahang",
                            "Perak",
                            "Perlis",
                            "Pulau Pinang",
                            "Sabah",
                            "Sarawak",
                            "Selangor",
                            "Terengganu",
                            "W.P. Kuala Lumpur",
                            "W.P. Labuan",
                            "W.P. Putrajaya",
                        ]
                    }
                }
            },
            {
                "name": "Perform date scope query vaccination registration statistic based on state",
                "path": `${endpoint(hostname, "/state/registration/:state?start_date=2021-02-25&end_date=2021-04-01")}`,
                "params": {
                    "state": {
                        "options": [
                            "Johor",
                            "Kedah",
                            "Kelantan",
                            "Melaka",
                            "Negeri Sembilan",
                            "Pahang",
                            "Perak",
                            "Perlis",
                            "Pulau Pinang",
                            "Sabah",
                            "Sarawak",
                            "Selangor",
                            "Terengganu",
                            "W.P. Kuala Lumpur",
                            "W.P. Labuan",
                            "W.P. Putrajaya",
                        ]
                    }
                }
            },
        ]
        res.status(200).json({
            status: "success",
            data: docs
        })
    },

    async localVaccinationRegStatistic(req, res) {
        try {
            let params = {}
            if (req.query.start_date) {
               params.start_date = req.query.start_date
            }
             if (req.query.end_date) {
               params.end_date = req.query.end_date
             }
           let data = await provider.getMalaysiaVaccinationRegistrationStatistic(params);
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    async latestLocalVaccinationRegStatistic(req, res) {
        try {
            let params = {}
            if (req.query.start_date) {
               params.start_date = req.query.start_date
            }
             if (req.query.end_date) {
               params.end_date = req.query.end_date
             }
           let data = await provider.getMalaysiaLatestVaccinationRegistrationStatistic();
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

        async stateVaccinationRegStatistic(req, res) {
        try {
            let params = {}
            if (req.query.start_date) {
               params.start_date = req.query.start_date
            }
             if (req.query.end_date) {
               params.end_date = req.query.end_date
             }
            let data = await provider.getStateVaccinationRegistrationStatistic({
                state: req.params.state,
                ...params
            });
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async latestStateVaccinationRegStatistic(req, res) {
         try {
        
            let data = await provider.getStateLatestVaccinationRegistrationStatistic({
                state: req.params.state,
            });
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async getPopulationByState(req, res) {
         try {
        
            let data = await provider.getPopulationByState({
                state: req.params.state,
            });
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
