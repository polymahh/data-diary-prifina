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

export function getWhoopCycleWeekData(dataModel, data) {
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
            "strain",
            "kilojoule",
            "average_heart_rate"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "timeSpent":
                    var dates = []
                    for (var i = 0; i<zoomData.length; i++){
                        dates.push({
                            "start": zoomData[i]["start"],
                            "end": zoomData[i]["end"]
                        })
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](dates);
                    break
                case "strain":
                    var strains = []
                    for (var i = 0; i<zoomData.length; i++){
                        strains.push(zoomData[i].score.strain)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](strains);
                    break
                case "kilojoule":
                    var kilojoules = []
                    for (var i = 0; i<zoomData.length; i++){
                        kilojoules.push(zoomData[i].score.kilojoule)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](kilojoules);
                    break
                case "average_heart_rate":
                    var average_heart_rates = []
                    for (var i = 0; i<zoomData.length; i++){
                        average_heart_rates.push(zoomData[i].score.average_heart_rate)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](average_heart_rates);
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

export function getWhoopRecoveryWeekData(dataModel, data) {
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
            "recovery_score",
            "resting_heart_rate",
            "hrv_rmssd_milli",
            "spo2_percentage",
            "skin_temp_celsius"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "recovery_score":
                    var recovery_scores = []
                    for (var i = 0; i<zoomData.length; i++){
                        recovery_scores.push(zoomData[i].score.recovery_score)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](recovery_scores);
                    break
                case "resting_heart_rate":
                    var resting_heart_rates = []
                    for (var i = 0; i<zoomData.length; i++){
                        resting_heart_rates.push(zoomData[i].score.resting_heart_rate)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](resting_heart_rates);
                    break
                case "hrv_rmssd_milli":
                    var hrv_rmssd_millis = []
                    for (var i = 0; i<zoomData.length; i++){
                        hrv_rmssd_millis.push(zoomData[i].score.hrv_rmssd_milli)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](hrv_rmssd_millis);
                    break
                case "spo2_percentage":
                    var spo2_percentages = []
                    for (var i = 0; i<zoomData.length; i++){
                        spo2_percentages.push(zoomData[i].score.spo2_percentage)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](spo2_percentages);
                    break
                case "skin_temp_celsius":
                    var skin_temp_celsiuses = []
                    for (var i = 0; i<zoomData.length; i++){
                        skin_temp_celsiuses.push(zoomData[i].score.skin_temp_celsius)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](skin_temp_celsiuses);
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

export function getWhoopSleepWeekData(dataModel, data) {
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
            "respiratory_rate",
            "sleep_performance_percentage",
            "sleep_consistency_percentage",
            "sleep_efficiency_percentage",
            "disturbance_count"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "timeSpent":
                    var dates = []
                    for (var i = 0; i<zoomData.length; i++){
                        dates.push({
                            "start": zoomData[i]["start"],
                            "end": zoomData[i]["end"]
                        })
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](dates);
                    break
                case "respiratory_rate":
                    var respiratory_rates = []
                    for (var i = 0; i<zoomData.length; i++){
                        respiratory_rates.push(zoomData[i].score.respiratory_rate)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](respiratory_rates);
                    break
                case "sleep_performance_percentage":
                    var sleep_performance_percentages = []
                    for (var i = 0; i<zoomData.length; i++){
                        sleep_performance_percentages.push(zoomData[i].score.sleep_performance_percentage)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](sleep_performance_percentages);
                    break
                case "sleep_consistency_percentage":
                    var sleep_consistency_percentages = []
                    for (var i = 0; i<zoomData.length; i++){
                        sleep_consistency_percentages.push(zoomData[i].score.sleep_consistency_percentage)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](sleep_consistency_percentages);
                    break
                case "sleep_efficiency_percentage":
                    var sleep_efficiency_percentages = []
                    for (var i = 0; i<zoomData.length; i++){
                        sleep_efficiency_percentages.push(zoomData[i].score.sleep_efficiency_percentage)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](sleep_efficiency_percentages);
                    break
                case "disturbance_count":
                    var disturbance_counts = []
                    for (var i = 0; i<zoomData.length; i++){
                        disturbance_counts.push(zoomData[i].score.stage_summary.disturbance_count)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](disturbance_counts);
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

export function getWhoopWorkoutWeekData(dataModel, data) {
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
            "strain",
            "average_heart_rate",
            "max_heart_rate",
            "kilojoule",
            "distance_meter",
            "altitude_gain_meter",
            "altitude_change_meter",
            "zone_duration"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "timeSpent":
                    var dates = []
                    for (var i = 0; i<zoomData.length; i++){
                        dates.push({
                            "start": zoomData[i]["start"],
                            "end": zoomData[i]["end"]
                        })
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](dates);
                    break
                case "strain":
                    var strains = []
                    for (var i = 0; i<zoomData.length; i++){
                        strains.push(zoomData[i].score.strain)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](strains);
                    break
                case "average_heart_rate":
                    var average_heart_rates = []
                    for (var i = 0; i<zoomData.length; i++){
                        average_heart_rates.push(zoomData[i].score.average_heart_rate)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](average_heart_rates);
                    break
                case "max_heart_rate":
                    var max_heart_rates = []
                    for (var i = 0; i<zoomData.length; i++){
                        max_heart_rates.push(zoomData[i].score.max_heart_rate)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](max_heart_rates);
                    break
                case "kilojoule":
                    var kilojoules = []
                    for (var i = 0; i<zoomData.length; i++){
                        kilojoules.push(zoomData[i].score.kilojoule)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](kilojoules);
                    break
                case "distance_meter":
                    var distance_meters = []
                    for (var i = 0; i<zoomData.length; i++){
                        distance_meters.push(zoomData[i].score.distance_meter)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](distance_meters);
                    break
                case "altitude_gain_meter":
                    var altitude_gain_meters = []
                    for (var i = 0; i<zoomData.length; i++){
                        altitude_gain_meters.push(zoomData[i].score.altitude_gain_meter)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](altitude_gain_meters);
                    break
                case "altitude_change_meter":
                    var altitude_change_meters = []
                    for (var i = 0; i<zoomData.length; i++){
                        altitude_change_meters.push(zoomData[i].score.altitude_change_meter)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](altitude_change_meters);
                    break
                case "zone_duration":
                    var zone_durations = []
                    for (var i = 0; i<zoomData.length; i++){
                        zone_durations.push(zoomData[i].score.zone_duration)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](zone_durations);
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
