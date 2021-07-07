const danfo = require("danfojs-node")
const { response } = require("express")
const localVaccinationCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_malaysia.csv"
const stateVaccinationDataCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_state.csv"
const localVaccinationRegistrationCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_malaysia.csv"
const stateVaccinationRegistrationCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_state.csv"
const populationCSV = "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/static/population.csv";
module.exports = {
    getMalaysiaVaccinationStatistic({ start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
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
                    "data": JSON.parse(json)
                })
            } catch (error) {
                reject({
                    "status": "error",
                    "message": error.message
                })
            }
        })
       
    },
    getMalaysiaLatestVaccinationStatistic() {
        return new Promise(async (resolve, reject) => {
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
                    "message": error.message
                })
            }
        })
       
    },

    getStateVaccinationStatistic({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateVaccinationDataCSV)
                let latestStateDataFrame;
                latestStateDataFrame = datasets.query({ "column": "state", "is": "==", "to": state })
                if (start_date) {
                    latestStateDataFrame = latestStateDataFrame.query({ "column": "date", "is": ">=", "to": start_date })
                }

                if (end_date) {
                    latestStateDataFrame = latestStateDataFrame.query({ "column": "date", "is": "<=", "to": end_date })
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
                    "message": error.message
                })
            }
        })
    },
    getStateLatestVaccinationStatistic({ state }) {
        return new Promise(async (resolve, reject) => {
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
                    "message": error.message
                })
            }
        })
    },

    getMalaysiaVaccinationRegistrationStatistic({ start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
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
                    "data": JSON.parse(json)
                })
            } catch (error) {
                reject({
                    "status": "error",
                    "message": error.message
                })
            }
        })
    },
    getMalaysiaLatestVaccinationRegistrationStatistic() {
        return new Promise(async (resolve, reject) => {
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
                    "message": error.message
                })
            }
        })
    },

    getStateVaccinationRegistrationStatistic({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateVaccinationRegistrationCSV)
                let latestStateDataFrame;
                latestStateDataFrame = datasets.query({ "column": "state", "is": "==", "to": state })
                if (start_date) {
                    latestStateDataFrame = latestStateDataFrame.query({ "column": "date", "is": ">=", "to": start_date })
                }

                if (end_date) {
                    latestStateDataFrame = latestStateDataFrame.query({ "column": "date", "is": "<=", "to": end_date })
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
                    "message": error.message
                })
            }
        })
    },
    getStateLatestVaccinationRegistrationStatistic({ state }) {
        return new Promise(async (resolve, reject) => {
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
                    "message": error.message
                })
            }
        })
    },

    getPopulationByState({ state }) {
        return new Promise(async (resolve, reject) => {
            try {

                let latestStateDataFrame = await danfo.read_csv(populationCSV)
                if (state !== undefined) {
            
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
                    "message": error.message
                })
            }
        })
},
    fetchLatestSummary() {
        return new Promise(async (resolve, reject) => {
            try {
                const states = ["Johor",
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
                    "W.P. Putrajaya",];
                let responseData = [];
                let localVaccStat = await this.getMalaysiaLatestVaccinationStatistic();
                let population = await this.getPopulationByState({ state: "Malaysia" });
                let localRegStat = await this.getMalaysiaLatestVaccinationRegistrationStatistic();
                responseData.push({
                    "nme": "Malaysia",
                    "regtotal": localRegStat.data.total,
                    "pop_18": population.data.pop_18,
                    "pop": population.data.pop,
                    "vakdose1": localVaccStat.data.dose1_cumul,
                    "vakdose2": localVaccStat.data.dose2_cumul,
                    "vakdosecomplete": localVaccStat.data.total_cumul,
                });
                for ( let state of states) {
                    let stateVaccData = await this.getStateLatestVaccinationStatistic({ state });
                    let statePopulation = await this.getPopulationByState({ state });
                    let stateReg = await this.getStateLatestVaccinationRegistrationStatistic({state});
                    responseData.push({
                        "nme": state,
                        "regtotal": stateReg.data.total,
                        "pop_18": statePopulation.data.pop_18,
                        "pop": statePopulation.data.pop,
                        "vakdose1": stateVaccData.data.dose1_cumul,
                        "vakdose2": stateVaccData.data.dose2_cumul,
                        "vakdosecomplete": stateVaccData.data.total_cumul,
                    });
                }

                let payload = {
                    "data": responseData,
                    "updated": new Date(localVaccStat.data.date).getTime()
                }
                resolve(payload);
            } catch (error) {
                console.log(error);
                reject(error)
            }
        });
    }
}
