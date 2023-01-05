import {
    getReadinessSummaryWeekData,
    getSleepSummaryWeekData,
    getActivitySummaryWeekData
  } from "../zoom-data/ouraZoom.js"
  import {
    getGoogleActivityWeekData,
    getGoogleLocationWeekData,
    getGooglePlacesWeekWeekData,
    getGoogleRoutesWeekWeekData,
  } from "../zoom-data/googleZoom.js"
  import {
    getWhoopWorkoutWeekData,
    getWhoopSleepWeekData,
    getWhoopRecoveryWeekData,
    getWhoopCycleWeekData
  } from "../zoom-data/whoopZoom"

export const weekZoomData = (filteredData,sources,setZoomData) => {

    let finalData = {}
  let sourceData = {}
  let typesShown = {}

    Object.entries(sources).forEach(([key, value])=>{
        // key is sourceTypes ex "oura,google.."  and value is type ex [readiness,sleep...]
        finalData[key] = {}
        sourceData[key] = false
        typesShown[key] = {}
  
        switch(key){
          case "Oura":
            value.forEach((type)=>{
              finalData[key][type] = {}
              typesShown[key][type] = false
              switch(type){
                case "Readiness":
                  // getReadinessSummaryWeekData is coming from ouraZoom 
                  finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  break
                case "SleepSummary":
                  finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  // console.log(finalData[key])
                  break
                case "Activity":
                  finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  // console.log(finalData[key])
                  break
                default:
                  break
              }
            })
            break
          case "Google":
            value.forEach((type)=>{
              finalData[key][type] = {}
              typesShown[key][type] = false
              switch(type){
                case "Activity":
                  finalData[key][type] = getGoogleActivityWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  break
                case "Location":
                  finalData[key][type] = getGoogleLocationWeekData("LocationWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  // console.log(finalData[key])
                  break
                case "Route":
                  finalData[key][type] = getGoogleRoutesWeekWeekData("RoutesWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  // console.log(finalData[key])
                  break
                case "Place":
                  finalData[key][type] = getGooglePlacesWeekWeekData("PlacesWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  // console.log(finalData[key])
                  break
                default:
                  break
              }
            })
            // console.log(finalData)
            break
          case "Whoop":
            value.forEach((type)=>{
              finalData[key][type] = {}
              typesShown[key][type] = false
              switch(type){
                case "Cycle":
                  finalData[key][type] = getWhoopCycleWeekData("CycleWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  break
                case "Recovery":
                  finalData[key][type] = getWhoopRecoveryWeekData("RecoveryWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  break
                case "Sleep":
                  finalData[key][type] = getWhoopSleepWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  break
                case "Workout":
                  finalData[key][type] = getWhoopWorkoutWeekData("WorkoutWeek",[].concat(...filteredData.filter((event)=>{
                    if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                      return true
                    } else {
                      return false
                    }
                  }).map(b=>b.data)) )
                  break
                default:
                  break
              }
            })
            break    
          default:
            break
        }
      })

      setZoomData(finalData)
 
}