import {
    toIsoString,
    getRandomInt,
    getNewDate,
    getSleepDate,
    pickRandomValue,
    getAverage
} from "@dynamic-data/utils";

import MOCK from "@dynamic-data/whoop-data";

const CycleWeekModel = {
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
    strain: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    kilojoule: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    average_heart_rate: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
}

const RecoveryWeekModel = {
    recovery_score: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    resting_heart_rate: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    hrv_rmssd_milli: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    spo2_percentage: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    skin_temp_celsius: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
}

const SleepWeekModel = {
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
    respiratory_rate: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    sleep_performance_percentage: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    sleep_consistency_percentage: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    sleep_efficiency_percentage: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    disturbance_count: (arr) => {
        return getAverage(arr)
    },

}

const WorkoutWeekModel = {
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
    strain: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    average_heart_rate: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    max_heart_rate: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    kilojoule: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    distance_meter: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    altitude_gain_meter: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    altitude_change_meter: (arr) => {
        return {
            "max": Math.max(...arr),
            "min": Math.min(...arr),
            "avg": getAverage(arr),
        }
    },
    zone_duration: (arr) => {
        //
        var final = {
            "zone_zero_milli": {
                "val": 0,
                "percent": 0
            },
            "zone_one_milli": {
                "val": 0,
                "percent": 0
            },
            "zone_two_milli": {
                "val": 0,
                "percent": 0
            },
            "zone_three_milli": {
                "val": 0,
                "percent": 0
            },
            "zone_four_milli": {
                "val": 0,
                "percent": 0
            },
            "zone_five_milli": {
                "val": 0,
                "percent": 0
            }
          }
        var total = 0
        for (var i = 0; i<arr.length;i++){
            total+=arr[i].zone_zero_milli
            total+=arr[i].zone_one_milli
            total+=arr[i].zone_two_milli
            total+=arr[i].zone_three_milli
            total+=arr[i].zone_four_milli
            total+=arr[i].zone_five_milli
            final.zone_zero_milli.val += arr[i].zone_zero_milli
            final.zone_one_milli.val += arr[i].zone_one_milli
            final.zone_two_milli.val += arr[i].zone_two_milli
            final.zone_three_milli.val += arr[i].zone_three_milli
            final.zone_four_milli.val += arr[i].zone_four_milli
            final.zone_five_milli.val += arr[i].zone_five_milli
        }
        final.zone_zero_milli.percent = (final.zone_zero_milli.val/total)*100
        final.zone_one_milli.percent = (final.zone_one_milli.val/total)*100
        final.zone_two_milli.percent = (final.zone_two_milli.val/total)*100
        final.zone_three_milli.percent = (final.zone_three_milli.val/total)*100
        final.zone_four_milli.percent = (final.zone_four_milli.val/total)*100
        final.zone_five_milli.percent = (final.zone_five_milli.val/total)*100
        return final
    }
}

const dataModels = {
    CycleWeek: {
        data: MOCK.Cycle,
        mockup: CycleWeekModel
    },
    RecoveryWeek: {
        data: MOCK.Recovery,
        mockup: RecoveryWeekModel
    },
    SleepWeek: {
        data: MOCK.Sleep,
        mockup: SleepWeekModel
    },
    WorkoutWeek: {
        data: MOCK.Workout,
        mockup: WorkoutWeekModel
    },
};

export function getGoogleWorkoutWeekData(dataModel, data) {
    console.log(data)
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
