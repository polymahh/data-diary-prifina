import {
    toIsoString,
    getRandomInt,
    getNewDate,
    getSleepDate,
    pickRandomValue,
    getAverage
} from "@dynamic-data/utils";

import MOCK from "@dynamic-data/google-data";

const ActivitySummaryWeekModel = {
    types: (types) => {
        return {
            "STILL": types.filter(x => x === "STILL").length,
            "IN_VEHICLE": types.filter(x => x === "IN_VEHICLE").length,
            "UNKNOWN": types.filter(x => x === "UNKNOWN").length
        }
    },
    confidence: (confidences) => {
        return getAverage(confidences)
    },
}

const LocationSummaryWeekModel = {
    accuracy: (accuracys) => {
        return getAverage(accuracys)
    },
    verticalAccuracy: (accuracys) => {
        return getAverage(accuracys)
    },
    altitude: (altitudes) => {
        return getAverage(altitudes)
    },
}

const PlacesWeekModel = {
    timeSpent: (dates) =>{
        for (var i = 0; i< dates.length; i++){
            dates[i]["start"] = (new Date(dates[i]["start"])).getTime()
            dates[i]["end"] = (new Date(dates[i]["end"])).getTime()
        }
        var timespans = []
        for (var i = 0; i< dates.length; i++){
            timespans.push(dates[i]["end"] - dates[i]["start"])
        }
        return {
            "max": Math.max(...timespans),
            "min": Math.min(...timespans),
            "avg": getAverage(timespans),
        }

    },
    locationConfidence: (confidences) => {
        return getAverage(confidences)
    },
    visitConfidence: (confidences) => {
        return getAverage(confidences)
    },
    placeConfidence: (confidences) => {
        // console.log("confidences", confidences)
        return {
            "HIGH_CONFIDENCE": confidences.filter(x => x === "HIGH_CONFIDENCE").length,
            "MEDIUM_CONFIDENCE": confidences.filter(x => x === "MEDIUM_CONFIDENCE").length,
            "LOW_CONFIDENCE": confidences.filter(x => x === "LOW_CONFIDENCE").length
        }
    },
}

const RoutesWeekModel = {
    timeSpent: (dates) =>{
        for (var i = 0; i< dates.length; i++){
            dates[i]["start"] = (new Date(dates[i]["start"])).getTime()
            dates[i]["end"] = (new Date(dates[i]["end"])).getTime()
        }
        var timespans = []
        for (var i = 0; i< dates.length; i++){
            timespans.push(dates[i]["end"] - dates[i]["start"])
        }
        return {
            "max": Math.min(...timespans),
            "min": Math.max(...timespans),
            "avg": getAverage(timespans),
        }

    },
    distance: (distances) => {
        return {
            "max": Math.min(...distances),
            "min": Math.max(...distances),
            "avg": getAverage(distances),
        }
    },
    confidence: (confidences) => {
        return {
            "HIGH": confidences.filter(x => x === "HIGH").length,
            "MEDIUM": confidences.filter(x => x === "MEDIUM").length,
            "LOW": confidences.filter(x => x === "LOW").length
        }
    },
}

const dataModels = {
    ActivityWeek: {
        data: MOCK.ActivityObject,
        mockup: ActivitySummaryWeekModel
    },
    LocationWeek: {
        data: MOCK.LocationObject,
        mockup: LocationSummaryWeekModel
    },
    PlacesWeek: {
        data: MOCK.Places,
        mockup: PlacesWeekModel
    },
    RoutesWeek: {
        data: MOCK.Routes,
        mockup: RoutesWeekModel
    },
};

export function getGoogleActivityWeekData(dataModel, data) {
    // console.log(data)
    let zoomData = data;
    
    const zoomModel = dataModels[dataModel].mockup;
    // ex : dataModels.ActivityWeek.mockup wich is this object => ActivitySummaryWeekModel
    
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            // ex for this swich case => overviewData={
            // aggregate:{
            // types: zoomModel.types(),
            // confidence: zoomModel.confidence()
            // }
            // }
            overviewData[rootKey] = {};
            [
            "types",
            "confidence"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "types":
                    let types = []
                    for (var i = 0; i<zoomData.length; i++){
                        types.push(zoomData[i].p_type)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](types);
                    //ex: ActivitySummaryWeekModel is an object with two methods => ActivitySummaryWeekModel.types
                    break
                case "confidence":
                    let confidences = []
                    for (var i = 0; i<zoomData.length; i++){
                        confidences.push(zoomData[i].p_confidence)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](confidences);
                    break
                default:
                    break
            }
            })
            break
        default:
            break;
        }
    })
    overviewData["length"] = data.length
    return overviewData
}

export function getGoogleLocationWeekData(dataModel, data) {
    // console.log(data)
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "accuracy",
            "verticalAccuracy",
            "altitude",
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "accuracy":
                    let accuracys = []
                    for (var i = 0; i<zoomData.length; i++){
                        accuracys.push(zoomData[i].p_accuracy)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](accuracys);
                    break
                case "verticalAccuracy":
                    let verticalAccuracys = []
                    for (var i = 0; i<zoomData.length; i++){
                        verticalAccuracys.push(zoomData[i].p_verticalaccuracy)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](verticalAccuracys);
                    break
                case "altitude":
                    let altitudes = []
                    for (var i = 0; i<zoomData.length; i++){
                        altitudes.push(zoomData[i].p_altitude)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](altitudes);
                    break
                default:
                    break
            }
            })
            break
        default:
            break;
        }
    })
    overviewData["length"] = data.length
    return overviewData
}

export function getGooglePlacesWeekWeekData(dataModel, data) {
    // console.log(data)
    // console.log(dataModel)
    // console.log(dataModels)

    // console.log(dataModels[dataModel])

    let zoomData = data;

    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "timeSpent",
            "locationConfidence",
            "visitConfidence",
            "placeConfidence"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "timeSpent":
                    let dates = []
                    for (var i = 0; i<zoomData.length; i++){
                        dates.push({
                            "start": zoomData[i]["startTimestamp"],
                            "end": zoomData[i]["endTimestamp"]
                        })
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](dates);
                    break
                case "locationConfidence":
                    var confidences = []
                    for (var i = 0; i<zoomData.length; i++){
                        confidences.push(zoomData[i].locationConfidence)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](confidences);
                    break
                case "placeConfidence":
                    var confidences = []
                    for (var i = 0; i<zoomData.length; i++){
                        confidences.push(zoomData[i].placeConfidence)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](confidences);
                    break
                case "visitConfidence":
                    var confidences = []
                    for (var i = 0; i<zoomData.length; i++){
                        confidences.push(zoomData[i].visitConfidence)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](confidences);
                    break
                default:
                    break
            }
            })
            break
        default:
            break;
        }
    })
    overviewData["length"] = data.length
    return overviewData
}

export function getGoogleRoutesWeekWeekData(dataModel, data) {
    // console.log(data)
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "timeSpent",
            "distance",
            "confidence"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "timeSpent":
                    let dates = []
                    for (var i = 0; i<zoomData.length; i++){
                        dates.push({
                            "start": zoomData[i]["startTimestamp"],
                            "end": zoomData[i]["endTimestamp"]
                        })
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](dates);
                    break
                case "distance":
                    var distances = []
                    for (var i = 0; i<zoomData.length; i++){
                        distances.push(zoomData[i].distance)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](distances);
                    break
                case "confidence":
                    var confidences = []
                    for (var i = 0; i<zoomData.length; i++){
                        confidences.push(zoomData[i].confidence)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](confidences);
                    break
                default:
                    break
            }
            })
            break
        default:
            break;
        }
    })
    overviewData["length"] = data.length
    return overviewData
}