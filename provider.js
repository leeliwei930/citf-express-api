const danfo = require("danfojs-node")
const localVaccinationCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_malaysia.csv"
const stateVaccinationDataCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_state.csv"
const localVaccinationRegistrationCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_malaysia.csv"
const stateVaccinationRegistrationCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_state.csv"

module.exports = {
     getMalaysiaVaccinationStatistic({start_date, end_date}) {
        return new Promise(async(resolve, reject) => {
             try {
            let datasets = await danfo.read_csv(localVaccinationCSV)
            
                 if (start_date) {
                                  datasets = datasets.query({ "column": "date", "is": ">=", "to": start_date })
                 }

                 if (end_date) {
                                  datasets = datasets.query({ "column": "date", "is": "<=", "to": end_date })

                 }
        
            let json = await datasets.to_json();
            resolve({
                "status": "success",
                "data" : JSON.parse(json)
            })
        } catch (error) {
            reject({
                "status": "error",
                "message" : error.message
            })
        }
        })
       
    },
     getMalaysiaLatestVaccinationStatistic() {
        return new Promise(async(resolve, reject) => {
             try {

                let datasets = await danfo.read_csv(localVaccinationCSV)

                let latestStateDataFrame = datasets.tail(1)
                 let latestStatistic = await latestStateDataFrame.to_json()
                 latestStatistic = JSON.parse(latestStatistic)
                resolve({
                    "status": "success",
                    "data": latestStatistic[0] ? latestStatistic[0] : {}
                }) 
            } catch (error) {
                reject({
                    "status": "error",
                    "message" : error.message
                })
            }
        })
       
    },

    getStateVaccinationStatistic({state, start_date, end_date}) {
        return new Promise(async(resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateVaccinationDataCSV)
                let latestStateDataFrame;
                latestStateDataFrame = datasets.query({ "column": "state", "is": "==", "to": state })
                if (start_date) {
                    latestStateDataFrame = latestStateDataFrame.query({"column": "date", "is" : ">=", "to" : start_date})
                }

                if (end_date) {
                    latestStateDataFrame = latestStateDataFrame.query({"column": "date", "is" : "<=", "to" : end_date})
                }

                let latestStatistic = await latestStateDataFrame.to_json()
                latestStatistic = JSON.parse(latestStatistic)
                resolve({
                    "status": "success",
                    "data": latestStatistic
                }) 
                } catch (error) {
                    reject({
                        "status": "error",
                        "message" : error.message
                    })
                }
            })
    },
    getStateLatestVaccinationStatistic({state}) {
        return new Promise(async(resolve, reject) => {
            try {

                let datasets = await danfo.read_csv(stateVaccinationDataCSV)
                let latestStateDataFrame = datasets.sort_index({ ascending: false })
                if (state === undefined) {
                    latestStateDataFrame = latestStateDataFrame.head(16)
                } else {
                     latestStateDataFrame = latestStateDataFrame.query({ "column": "state", "is": "==", "to": state })
                    latestStateDataFrame = latestStateDataFrame.head(1)
                }
                let latestStatistic = await latestStateDataFrame.to_json()
                    latestStatistic = JSON.parse(latestStatistic)
                    resolve({
                        "status": "success",
                        "data": latestStatistic[0] ? latestStatistic[0] : {}
                    }) 
                } catch (error) {
                    reject({
                        "status": "error",
                        "message" : error.message
                    })
                }
            })
    },

    getMalaysiaVaccinationRegistrationStatistic({start_date, end_date}) {
        return new Promise(async(resolve, reject) => {
             try {
                let datasets = await danfo.read_csv(localVaccinationRegistrationCSV)
            
                 if (start_date) {
                                  datasets = datasets.query({ "column": "date", "is": ">=", "to": start_date })
                 }

                 if (end_date) {
                    datasets = datasets.query({ "column": "date", "is": "<=", "to": end_date })

                 }
        
            let json = await datasets.to_json();
            resolve({
                "status": "success",
                "data" : JSON.parse(json)
            })
        } catch (error) {
            reject({
                "status": "error",
                "message" : error.message
            })
        }
        })
    },
    getMalaysiaLatestVaccinationRegistrationStatistic() {
        return new Promise(async(resolve, reject) => {
             try {

                let datasets = await danfo.read_csv(localVaccinationRegistrationCSV)

                let latestLocalVaccinationRegDatasets = datasets.tail(1)
                 let latestStatistic = await latestLocalVaccinationRegDatasets.to_json()
                 latestStatistic = JSON.parse(latestStatistic)
                resolve({
                    "status": "success",
                    "data": latestStatistic[0] ? latestStatistic[0] : {}
                }) 
            } catch (error) {
                reject({
                    "status": "error",
                    "message" : error.message
                })
            }
        })
    },

      getStateVaccinationRegistrationStatistic({state, start_date, end_date}) {
        return new Promise(async(resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateVaccinationRegistrationCSV)
                let latestStateDataFrame;
                latestStateDataFrame = datasets.query({ "column": "state", "is": "==", "to": state })
                if (start_date) {
                    latestStateDataFrame = latestStateDataFrame.query({"column": "date", "is" : ">=", "to" : start_date})
                }

                if (end_date) {
                    latestStateDataFrame = latestStateDataFrame.query({"column": "date", "is" : "<=", "to" : end_date})
                }

                let latestStatistic = await latestStateDataFrame.to_json()
                latestStatistic = JSON.parse(latestStatistic)
                resolve({
                    "status": "success",
                    "data": latestStatistic
                }) 
                } catch (error) {
                    reject({
                        "status": "error",
                        "message" : error.message
                    })
                }
            })
    },
    getStateLatestVaccinationRegistrationStatistic({state}) {
        return new Promise(async(resolve, reject) => {
            try {

                let datasets = await danfo.read_csv(stateVaccinationRegistrationCSV)
                let latestStateDataFrame = datasets.sort_index({ ascending: false })
                if (state === undefined) {
                    latestStateDataFrame = latestStateDataFrame.head(16)
                } else {
                     latestStateDataFrame = latestStateDataFrame.query({ "column": "state", "is": "==", "to": state })
                    latestStateDataFrame = latestStateDataFrame.head(1)
                }
                let latestStatistic = await latestStateDataFrame.to_json()
                    latestStatistic = JSON.parse(latestStatistic)
                    resolve({
                        "status": "success",
                        "data": latestStatistic[0] ? latestStatistic[0] : {}
                    }) 
                } catch (error) {
                    reject({
                        "status": "error",
                        "message" : error.message
                    })
                }
            })
    },
}
