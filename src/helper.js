import axios from 'axios';

export function fetchAvailableVehicles(key, callback) {
    axios.get(`https://app.ecofleet.com/seeme/Api/Vehicles/getLastData?key=${key}&json`)
        .then(response => callback(response))
        .catch(error => callback(error));
}

export function fetchVehicleRoute(objectId, startDate, endDate, key, callback) {
    axios.get(`https://app.ecofleet.com/seeme/Api/Vehicles/getRawData?objectId=${objectId}&begTimestamp=${startDate}&endTimestamp=${endDate}&key=${key}&json`)
        .then(response => callback(response))
        .catch(error => callback(error));
}
