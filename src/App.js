// styles 
import "./App.css"
import "./sass/styles.scss"
import { Box, Flex,} from "@chakra-ui/react"
// react
import { useState,useCallback, useEffect,useMemo } from "react";
// calendar library
import { Calendar, momentLocalizer, } from 'react-big-calendar'
import moment from 'moment'
import Year from "./Year";

// events and utils
import {ouraEvents} from "./Events/ouraEvents"
import {googleEvents} from "./Events/googleEvents"
import {whoopEvents} from "./Events/whoopEvents"
import {weekZoomData} from './range-zoom-data/week-zoom-data'

// components
import SideBar from "./Components/SideBar/SideBar";
import Toolbar from "./Components/Toolbar"
import Event from "./Components/Event"
import EventWrapper from "./Components/EventWrapper"
import GoogleCard from "./Components/source-cards/google-cards/GoogleCard";
import { useContext } from "react";
import EventContext from "./context/EventContext";
import CardsShown from "./Components/CardsShown";





const varToString = (attr) => {
  var str = attr.split("_")
  for (var i = 0; i< str.length; i++){
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  str = str.join(" ")
  return str
}
var myEventsList = [...ouraEvents,...googleEvents,...whoopEvents]
// background event 
const allDayEvents = myEventsList.filter(item => item.allDay).sort((a,b)=> new Date(a.start) - new Date(b.start))
// non background events
const arrEvents = myEventsList.filter(item => !item.allDay).sort((a,b)=> new Date(a.start) - new Date(b.start))
const myEvents = arrEvents.map(event => {return {...event,overlap:0,index:0}})// index for zIndex and overlap for leftmargin

for(let i = 0 ; i < myEvents.length ; i++ ){
  for(let j = i+1 ; j < myEvents.length; j++){
    let iEnd = new Date(myEvents[i].end)
    let iStart = new Date(myEvents[i].start).getTime()+ (30*60*1000) //if event occurs in next 30min give it leftmargin
    let jStart = new Date(myEvents[j].start)
    if(  iEnd.getDate() === jStart.getDate() ){
      myEvents[j].index +=1
      if(jStart < iStart){
        
        myEvents[j].overlap = myEvents[i].overlap + 1
      }
    }
  }
}


console.log(myEvents)


function App() {
  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  const { views } = useMemo(
    () => ({
      views: {
        day:true,
        week: true,
        month: true,
        year: Year
      },
    }),
    []
  )
  const [view, setView] = useState("week")
  // const [zoomData, setZoomData] = useState(0)
  const { zoomData,setZoomData } = useContext(EventContext);
  const [typesShown, setTypesShown] = useState({})
  const [date, setDate] = useState(new Date())

  const [range, setRange] = useState({
    start: new Date(localizer.startOf(date, view)),
    end: new Date(localizer.endOf(date, view))
  })

const onView = useCallback((newView) => {
  console.log(newView)
  setView(newView)}, [setView])
const onRangeChange = useCallback((newRange) => setRange(newRange), [setRange])

const getNow = () => {
  console.log("value",1)
  return (
    <>
    </>
  )
}
const onDrillDown = (newDate) => {
    setDate(new Date(newDate))
    setView("day")
  }
const onNavigate = useCallback((newDate) => {
  setDate(newDate)
  onRangeChange({
    start: localizer.startOf(newDate, "week"),
    end: localizer.endOf(newDate, "week"),
  });

}, [setDate])

useEffect(() => {
  getZoomData()
  console.log(range)
}, [range,date]);

useEffect(() => {
   console.log(zoomData)
}, );

const getZoomData = () => {
    // filter events that are in the same week range
    let filteredData = myEventsList.filter((event)=>{
        if (range["start"].getTime() < event.start.getTime()&&range["end"].getTime() > event.start.getTime()){
          return true
        } 
    })

    
    let sources = {} //Get All Sources
    for (var i = 0; i< filteredData.length;i++){
      //this loop will format sources >>> sources = {oura : [readiness,sleep...]}
      if (sources[filteredData[i].data.prifinaSourceType]===undefined){
        sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
      } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
        sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
      }
    }
    weekZoomData(filteredData,sources,setZoomData)
// console.log(sources)
    
}


const secondsDisplay = (total) => {
  var hours = Math.floor(Math.floor(total / 60)/60)
  var mintues = Math.floor(total / 60)%60
  var seconds = total % 60
  seconds.toFixed(3)
  if (seconds < 10){
    seconds =  `0${seconds}`
  }
  if (mintues < 10){
    mintues =  `0${mintues}`
  }
  if (hours < 10){
    hours =  `0${hours}`
  }
  return `${hours}:${mintues}:${seconds}`
}


// const dataView = (source, type, aggregateData) => {
//   switch(view){
//     case "week":
//       switch(source){
//         case "Oura":
//           switch(type){
//             case "Readiness":
//               return (
//                 <>
//                   <p>Score: {aggregateData.score}%</p>
//                   <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
//                   <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
//                   <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
//                   <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
//                   <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
//                   <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
//                   <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
//                   <p>Temperature Score: {aggregateData.score_temperature}%</p>
//                 </>
//               )
//             case "SleepSummary":
//               return (
//                 <>
//                   <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
//                   <p>Average Score: {aggregateData.score}%</p>
//                   <p>Average Efficiency: {aggregateData.efficiency}%</p>
//                   <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
//                   <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
//                   <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
//                     <>
//                     +
//                     </>
//                   ): (
//                     <>
//                     </>
//                   )}{aggregateData.rmssd.averageTrend}</p>
//                 </>
//               )
//             case "Activity":
//               return (
//                 <>
//                   <p>Average Score: {aggregateData.score}%</p>
//                   <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
//                   <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
//                   <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
//                   <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
//                   <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
//                   <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
//                   <p>Highest MET Level: {aggregateData.met.high} MET</p>
//                   <p>Lowest MET Level: {aggregateData.met.low} MET</p>
//                 </>
//               )
//             default:
//               break
//           }
//           break
//         case "Google":
//           switch(type){
//             case "Activity":
//               return (
//                 <>
//                   <p>Still Activities: {aggregateData.types["STILL"]}</p>
//                   <p>In Vehicle Activities: {aggregateData.types["IN_VEHICLE"]}</p>
//                   <p>Unknown Activities: {aggregateData.types["UNKNOWN"]}</p>
//                   <p>Average Confidence: {aggregateData.confidence}%</p>
//                 </>
//               )
//             case "Location":
//               console.log("test")
//               return (
//                 <>
//                   <p>Average Accuracy: {aggregateData.accuracy}%</p>
//                   <p>Average Vertical Accuracy: {aggregateData.verticalAccuracy}%</p>
//                   <p>Average Altitude: {aggregateData.altitude}m</p>
//                 </>
//               )
//             case "Place":
//               return (
//                 <>
//                   <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
//                   <p>Longest Stay: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
//                   <p>Shortest Stay: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Average Location Confidence: {aggregateData.locationConfidence}%</p>
//                   <p>Average Visit Confidence: {aggregateData.visitConfidence}%</p>
//                   <p>High Confidence: {aggregateData.placeConfidence["HIGH_CONFIDENCE"]}</p>
//                   <p>Medium Confidence: {aggregateData.placeConfidence["MEDIUM_CONFIDENCE"]}</p>
//                   <p>Low Confidence: {aggregateData.placeConfidence["LOW_CONFIDENCE"]}</p>
//                 </>
//               )
//             case "Route":
//               return (
//                 <>
//                   <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
//                   <p>Longest Route: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
//                   <p>Shortest Route: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Average Distance: {aggregateData.distance.avg}</p>
//                   <p>Max Distance: {aggregateData.distance.max}</p>
//                   <p>Minimum Distance: {aggregateData.distance.min}</p>
//                   <p>High Confidence: {aggregateData.confidence["HIGH"]}</p>
//                   <p>Medium Confidence: {aggregateData.confidence["MEDIUM"]}</p>
//                   <p>Low Confidence: {aggregateData.confidence["LOW"]}</p>
//                 </>
//               )
//             default:
//               break
//           }
//           break    
//         case "Whoop":
//           switch(type){
//             case "Cycle":
//               return (
//                 <>
//                   <p>Time Bound of Cycle:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Strain:</p>
//                   <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
//                   <p>Kilojoule:</p>
//                   <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
//                   <p>Average Heart Rate:</p>
//                   <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
//                 </>
//               )
//             case "Recovery":
//               return (
//                 <>
//                   <p>Recovery Score:</p>
//                   <p>{aggregateData.recovery_score.max}|{aggregateData.recovery_score.avg}|{aggregateData.recovery_score.min}</p>
//                   <p>Resting Heart Rate:</p>
//                   <p>{aggregateData.resting_heart_rate.max}|{aggregateData.resting_heart_rate.avg}|{aggregateData.resting_heart_rate.min}</p>
//                   <p>RMSSD:</p>
//                   <p>{aggregateData.hrv_rmssd_milli.max}|{aggregateData.hrv_rmssd_milli.avg}|{aggregateData.hrv_rmssd_milli.min}</p>
//                   <p>SpO2:</p>
//                   <p>{aggregateData.spo2_percentage.max}|{aggregateData.spo2_percentage.avg}|{aggregateData.spo2_percentage.min}</p>
//                   <p>Skin Temp:</p>
//                   <p>{aggregateData.skin_temp_celsius.max}|{aggregateData.skin_temp_celsius.avg}|{aggregateData.skin_temp_celsius.min}</p>
//                 </>
//               )
//             case "Sleep":
//               return (
//                 <>
//                   <p>Time Spent Sleeping:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Respiratory Rate:</p>
//                   <p>{aggregateData.respiratory_rate.max}|{aggregateData.respiratory_rate.avg}|{aggregateData.respiratory_rate.min}</p>
//                   <p>Sleep Performance:</p>
//                   <p>{aggregateData.sleep_performance_percentage.max}|{aggregateData.sleep_performance_percentage.avg}|{aggregateData.sleep_performance_percentage.min}</p>
//                   <p>Sleep Consistency:</p>
//                   <p>{aggregateData.sleep_consistency_percentage.max}|{aggregateData.sleep_consistency_percentage.avg}|{aggregateData.sleep_consistency_percentage.min}</p>
//                   <p>Sleep Efficiency:</p>
//                   <p>{aggregateData.sleep_efficiency_percentage.max}|{aggregateData.sleep_efficiency_percentage.avg}|{aggregateData.sleep_efficiency_percentage.min}</p>
//                   <p>Disturbance Count: {aggregateData.disturbance_count}</p>
//                 </>
//               )
//             case "Workout":
//               return (
//                 <>
//                   <p>Time Spent Working Out:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Strain:</p>
//                   <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
//                   <p>Average Heart Rate:</p>
//                   <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
//                   <p>Max Heart Rate:</p>
//                   <p>{aggregateData.max_heart_rate.max}|{aggregateData.max_heart_rate.avg}|{aggregateData.max_heart_rate.min}</p>
//                   <p>Kilojoule:</p>
//                   <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
//                   <p>Distance Travelled:</p>
//                   <p>{aggregateData.distance_meter.max}|{aggregateData.distance_meter.avg}|{aggregateData.distance_meter.min}</p>
//                   <p>Altitude Gain:</p>
//                   <p>{aggregateData.altitude_gain_meter.max}|{aggregateData.altitude_gain_meter.avg}|{aggregateData.altitude_gain_meter.min}</p>
//                   <p>Altitude Change:</p>
//                   <p>{aggregateData.altitude_change_meter.max}|{aggregateData.altitude_change_meter.avg}|{aggregateData.altitude_change_meter.min}</p>
//                   <p>Zone Duration:</p>
//                   <p>{aggregateData.zone_duration.zone_zero_milli.val}({aggregateData.zone_duration.zone_zero_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_one_milli.val}({aggregateData.zone_duration.zone_one_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_two_milli.val}({aggregateData.zone_duration.zone_two_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_three_milli.val}({aggregateData.zone_duration.zone_three_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_four_milli.val}({aggregateData.zone_duration.zone_four_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_five_milli.val}({aggregateData.zone_duration.zone_five_milli.percent}%)|<br/>
//                   </p>
//                 </>
//               )
//             default:
//               break
//           }
//           break    
//         default:
//           break
//       }
//       break
//     case "month":
//       switch(source){
//         case "Oura":
//           switch(type){
//             case "Readiness":
//               return (
//                 <>
//                   <p>Score: {aggregateData.score}%</p>
//                   <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
//                   <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
//                   <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
//                   <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
//                   <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
//                   <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
//                   <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
//                   <p>Temperature Score: {aggregateData.score_temperature}%</p>
//                 </>
//               )
//             case "SleepSummary":
//               return (
//                 <>
//                   <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
//                   <p>Average Score: {aggregateData.score}%</p>
//                   <p>Average Efficiency: {aggregateData.efficiency}%</p>
//                   <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
//                   <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
//                   <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
//                     <>
//                     +
//                     </>
//                   ): (
//                     <>
//                     </>
//                   )}{aggregateData.rmssd.averageTrend}</p>
//                 </>
//               )
//             case "Activity":
//               return (
//                 <>
//                   <p>Average Score: {aggregateData.score}%</p>
//                   <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
//                   <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
//                   <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
//                   <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
//                   <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
//                   <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
//                   <p>Highest MET Level: {aggregateData.met.high} MET</p>
//                   <p>Lowest MET Level: {aggregateData.met.low} MET</p>
//                 </>
//               )
//             default:
//               break
//           }
//           break
//         case "Google":
//           switch(type){
//             case "Activity":
//               return (
//                 <>
//                   <p>Still Activities: {aggregateData.types["STILL"]}</p>
//                   <p>In Vehicle Activities: {aggregateData.types["IN_VEHICLE"]}</p>
//                   <p>Unknown Activities: {aggregateData.types["UNKNOWN"]}</p>
//                   <p>Average Confidence: {aggregateData.confidence}%</p>
//                 </>
//               )
//             case "Location":
//               console.log("test")
//               return (
//                 <>
//                   <p>Average Accuracy: {aggregateData.accuracy}%</p>
//                   <p>Average Vertical Accuracy: {aggregateData.verticalAccuracy}%</p>
//                   <p>Average Altitude: {aggregateData.altitude}m</p>
//                 </>
//               )
//             case "Place":
//               return (
//                 <>
//                   <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
//                   <p>Longest Stay: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
//                   <p>Shortest Stay: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Average Location Confidence: {aggregateData.locationConfidence}%</p>
//                   <p>Average Visit Confidence: {aggregateData.visitConfidence}%</p>
//                   <p>High Confidence: {aggregateData.placeConfidence["HIGH_CONFIDENCE"]}</p>
//                   <p>Medium Confidence: {aggregateData.placeConfidence["MEDIUM_CONFIDENCE"]}</p>
//                   <p>Low Confidence: {aggregateData.placeConfidence["LOW_CONFIDENCE"]}</p>
//                 </>
//               )
//             case "Route":
//               return (
//                 <>
//                   <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
//                   <p>Longest Route: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
//                   <p>Shortest Route: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Average Distance: {aggregateData.distance.avg}</p>
//                   <p>Max Distance: {aggregateData.distance.max}</p>
//                   <p>Minimum Distance: {aggregateData.distance.min}</p>
//                   <p>High Confidence: {aggregateData.confidence["HIGH"]}</p>
//                   <p>Medium Confidence: {aggregateData.confidence["MEDIUM"]}</p>
//                   <p>Low Confidence: {aggregateData.confidence["LOW"]}</p>
//                 </>
//               )
//             default:
//               break
//           }
//           break
//         case "Whoop":
//           switch(type){
//             case "Cycle":
//               return (
//                 <>
//                   <p>Time Bound of Cycle:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Strain:</p>
//                   <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
//                   <p>Kilojoule:</p>
//                   <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
//                   <p>Average Heart Rate:</p>
//                   <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
//                 </>
//               )
//             case "Recovery":
//               return (
//                 <>
//                   <p>Recovery Score:</p>
//                   <p>{aggregateData.recovery_score.max}|{aggregateData.recovery_score.avg}|{aggregateData.recovery_score.min}</p>
//                   <p>Resting Heart Rate:</p>
//                   <p>{aggregateData.resting_heart_rate.max}|{aggregateData.resting_heart_rate.avg}|{aggregateData.resting_heart_rate.min}</p>
//                   <p>RMSSD:</p>
//                   <p>{aggregateData.hrv_rmssd_milli.max}|{aggregateData.hrv_rmssd_milli.avg}|{aggregateData.hrv_rmssd_milli.min}</p>
//                   <p>SpO2:</p>
//                   <p>{aggregateData.spo2_percentage.max}|{aggregateData.spo2_percentage.avg}|{aggregateData.spo2_percentage.min}</p>
//                   <p>Skin Temp:</p>
//                   <p>{aggregateData.skin_temp_celsius.max}|{aggregateData.skin_temp_celsius.avg}|{aggregateData.skin_temp_celsius.min}</p>
//                 </>
//               )
//             case "Sleep":
//               return (
//                 <>
//                   <p>Time Spent Sleeping:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Respiratory Rate:</p>
//                   <p>{aggregateData.respiratory_rate.max}|{aggregateData.respiratory_rate.avg}|{aggregateData.respiratory_rate.min}</p>
//                   <p>Sleep Performance:</p>
//                   <p>{aggregateData.sleep_performance_percentage.max}|{aggregateData.sleep_performance_percentage.avg}|{aggregateData.sleep_performance_percentage.min}</p>
//                   <p>Sleep Consistency:</p>
//                   <p>{aggregateData.sleep_consistency_percentage.max}|{aggregateData.sleep_consistency_percentage.avg}|{aggregateData.sleep_consistency_percentage.min}</p>
//                   <p>Sleep Efficiency:</p>
//                   <p>{aggregateData.sleep_efficiency_percentage.max}|{aggregateData.sleep_efficiency_percentage.avg}|{aggregateData.sleep_efficiency_percentage.min}</p>
//                   <p>Disturbance Count: {aggregateData.disturbance_count}</p>
//                 </>
//               )
//             case "Workout":
//               return (
//                 <>
//                   <p>Time Spent Working Out:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Strain:</p>
//                   <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
//                   <p>Average Heart Rate:</p>
//                   <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
//                   <p>Max Heart Rate:</p>
//                   <p>{aggregateData.max_heart_rate.max}|{aggregateData.max_heart_rate.avg}|{aggregateData.max_heart_rate.min}</p>
//                   <p>Kilojoule:</p>
//                   <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
//                   <p>Distance Travelled:</p>
//                   <p>{aggregateData.distance_meter.max}|{aggregateData.distance_meter.avg}|{aggregateData.distance_meter.min}</p>
//                   <p>Altitude Gain:</p>
//                   <p>{aggregateData.altitude_gain_meter.max}|{aggregateData.altitude_gain_meter.avg}|{aggregateData.altitude_gain_meter.min}</p>
//                   <p>Altitude Change:</p>
//                   <p>{aggregateData.altitude_change_meter.max}|{aggregateData.altitude_change_meter.avg}|{aggregateData.altitude_change_meter.min}</p>
//                   <p>Zone Duration:</p>
//                   <p>{aggregateData.zone_duration.zone_zero_milli.val}({aggregateData.zone_duration.zone_zero_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_one_milli.val}({aggregateData.zone_duration.zone_one_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_two_milli.val}({aggregateData.zone_duration.zone_two_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_three_milli.val}({aggregateData.zone_duration.zone_three_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_four_milli.val}({aggregateData.zone_duration.zone_four_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_five_milli.val}({aggregateData.zone_duration.zone_five_milli.percent}%)|<br/>
//                   </p>
//                 </>
//               )
//             default:
//               break
//           }
//           break  
//         default:
//           break
//       }
//       break
//     case "year":
//       switch(source){
//         case "Oura":
//           switch(type){
//             case "Readiness":
//               return (
//                 <>
//                   <p>Score: {aggregateData.score}%</p>
//                   <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
//                   <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
//                   <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
//                   <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
//                   <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
//                   <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
//                   <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
//                   <p>Temperature Score: {aggregateData.score_temperature}%</p>
//                 </>
//               )
//             case "SleepSummary":
//               return (
//                 <>
//                   <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
//                   <p>Average Score: {aggregateData.score}%</p>
//                   <p>Average Efficiency: {aggregateData.efficiency}%</p>
//                   <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
//                   <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
//                   <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
//                     <>
//                     +
//                     </>
//                   ): (
//                     <>
//                     </>
//                   )}{aggregateData.rmssd.averageTrend}</p>
//                 </>
//               )
//             case "Activity":
//               return (
//                 <>
//                   <p>Average Score: {aggregateData.score}%</p>
//                   <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
//                   <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
//                   <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
//                   <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
//                   <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
//                   <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
//                   <p>Highest MET Level: {aggregateData.met.high} MET</p>
//                   <p>Lowest MET Level: {aggregateData.met.low} MET</p>
//                 </>
//               )
//             default:
//               break
//           }
//           break
//         case "Google":
//         switch(type){
//           case "Activity":
//             return (
//               <>
//                 <p>Still Activities: {aggregateData.types["STILL"]}</p>
//                 <p>In Vehicle Activities: {aggregateData.types["IN_VEHICLE"]}</p>
//                 <p>Unknown Activities: {aggregateData.types["UNKNOWN"]}</p>
//                 <p>Average Confidence: {aggregateData.confidence}%</p>
//               </>
//             )
//           case "Location":
//             console.log("test")
//             return (
//               <>
//                 <p>Average Accuracy: {aggregateData.accuracy}%</p>
//                 <p>Average Vertical Accuracy: {aggregateData.verticalAccuracy}%</p>
//                 <p>Average Altitude: {aggregateData.altitude}m</p>
//               </>
//             )
//           case "Place":
//             return (
//               <>
//                 <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
//                 <p>Longest Stay: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
//                 <p>Shortest Stay: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                 <p>Average Location Confidence: {aggregateData.locationConfidence}%</p>
//                 <p>Average Visit Confidence: {aggregateData.visitConfidence}%</p>
//                 <p>High Confidence: {aggregateData.placeConfidence["HIGH_CONFIDENCE"]}</p>
//                 <p>Medium Confidence: {aggregateData.placeConfidence["MEDIUM_CONFIDENCE"]}</p>
//                 <p>Low Confidence: {aggregateData.placeConfidence["LOW_CONFIDENCE"]}</p>
//               </>
//             )
//           case "Route":
//             return (
//               <>
//                 <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
//                 <p>Longest Route: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
//                 <p>Shortest Route: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                 <p>Average Distance: {aggregateData.distance.avg}</p>
//                 <p>Max Distance: {aggregateData.distance.max}</p>
//                 <p>Minimum Distance: {aggregateData.distance.min}</p>
//                 <p>High Confidence: {aggregateData.confidence["HIGH"]}</p>
//                 <p>Medium Confidence: {aggregateData.confidence["MEDIUM"]}</p>
//                 <p>Low Confidence: {aggregateData.confidence["LOW"]}</p>
//               </>
//             )
//           default:
//             break
//         }
//         break
//         case "Whoop":
//           switch(type){
//             case "Cycle":
//               return (
//                 <>
//                   <p>Time Bound of Cycle:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Strain:</p>
//                   <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
//                   <p>Kilojoule:</p>
//                   <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
//                   <p>Average Heart Rate:</p>
//                   <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
//                 </>
//               )
//             case "Recovery":
//               return (
//                 <>
//                   <p>Recovery Score:</p>
//                   <p>{aggregateData.recovery_score.max}|{aggregateData.recovery_score.avg}|{aggregateData.recovery_score.min}</p>
//                   <p>Resting Heart Rate:</p>
//                   <p>{aggregateData.resting_heart_rate.max}|{aggregateData.resting_heart_rate.avg}|{aggregateData.resting_heart_rate.min}</p>
//                   <p>RMSSD:</p>
//                   <p>{aggregateData.hrv_rmssd_milli.max}|{aggregateData.hrv_rmssd_milli.avg}|{aggregateData.hrv_rmssd_milli.min}</p>
//                   <p>SpO2:</p>
//                   <p>{aggregateData.spo2_percentage.max}|{aggregateData.spo2_percentage.avg}|{aggregateData.spo2_percentage.min}</p>
//                   <p>Skin Temp:</p>
//                   <p>{aggregateData.skin_temp_celsius.max}|{aggregateData.skin_temp_celsius.avg}|{aggregateData.skin_temp_celsius.min}</p>
//                 </>
//               )
//             case "Sleep":
//               return (
//                 <>
//                   <p>Time Spent Sleeping:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Respiratory Rate:</p>
//                   <p>{aggregateData.respiratory_rate.max}|{aggregateData.respiratory_rate.avg}|{aggregateData.respiratory_rate.min}</p>
//                   <p>Sleep Performance:</p>
//                   <p>{aggregateData.sleep_performance_percentage.max}|{aggregateData.sleep_performance_percentage.avg}|{aggregateData.sleep_performance_percentage.min}</p>
//                   <p>Sleep Consistency:</p>
//                   <p>{aggregateData.sleep_consistency_percentage.max}|{aggregateData.sleep_consistency_percentage.avg}|{aggregateData.sleep_consistency_percentage.min}</p>
//                   <p>Sleep Efficiency:</p>
//                   <p>{aggregateData.sleep_efficiency_percentage.max}|{aggregateData.sleep_efficiency_percentage.avg}|{aggregateData.sleep_efficiency_percentage.min}</p>
//                   <p>Disturbance Count: {aggregateData.disturbance_count}</p>
//                 </>
//               )
//             case "Workout":
//               return (
//                 <>
//                   <p>Time Spent Working Out:</p>
//                   <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
//                   <p>Strain:</p>
//                   <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
//                   <p>Average Heart Rate:</p>
//                   <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
//                   <p>Max Heart Rate:</p>
//                   <p>{aggregateData.max_heart_rate.max}|{aggregateData.max_heart_rate.avg}|{aggregateData.max_heart_rate.min}</p>
//                   <p>Kilojoule:</p>
//                   <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
//                   <p>Distance Travelled:</p>
//                   <p>{aggregateData.distance_meter.max}|{aggregateData.distance_meter.avg}|{aggregateData.distance_meter.min}</p>
//                   <p>Altitude Gain:</p>
//                   <p>{aggregateData.altitude_gain_meter.max}|{aggregateData.altitude_gain_meter.avg}|{aggregateData.altitude_gain_meter.min}</p>
//                   <p>Altitude Change:</p>
//                   <p>{aggregateData.altitude_change_meter.max}|{aggregateData.altitude_change_meter.avg}|{aggregateData.altitude_change_meter.min}</p>
//                   <p>Zone Duration:</p>
//                   <p>{aggregateData.zone_duration.zone_zero_milli.val}({aggregateData.zone_duration.zone_zero_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_one_milli.val}({aggregateData.zone_duration.zone_one_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_two_milli.val}({aggregateData.zone_duration.zone_two_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_three_milli.val}({aggregateData.zone_duration.zone_three_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_four_milli.val}({aggregateData.zone_duration.zone_four_milli.percent}%)|<br/>
//                   {aggregateData.zone_duration.zone_five_milli.val}({aggregateData.zone_duration.zone_five_milli.percent}%)|<br/>
//                   </p>
//                 </>
//               )
//             default:
//               break
//           }
//           break  
//         default:
//           break
//       }
//       break
//       break
//     default:
//       break
//   }
// }

const lengthCalc = (source) => {
  var num = 0
  Object.entries(zoomData[source]).map(([type, value])=>{
    num += zoomData[source][type]["length"]
  })
  return num
}

const eventPropGetter = (event) => {
  // eventPropGetter controls event layout and style 
  let bg = '#fff';
  let text = "red"
  let border = "red"
  let ml = `${event.overlap * 40}px`
  if(view === "month"){
    ml = "0px"
  }
  
  if (event.category === 'health') {
    bg = "#E7F0FF"
    text="#73A1F6";
    border = "#CADDFC";
  } else if (event.category === 'business') {
    bg = '#EEE7FF';
    text="#ac87fe";
    border = "#b493fe";
  } else if (event.category === 'route') {
    bg = '#E2FBE2';
    text="#54C250";
    border = "#B1F5AF";
  }else if (event.category === 'fitness') {
    bg = '#FFEDE7';
    text="#F17243";
    border = "#F5CEBF";
  }else if (event.category === 'personal') {
    bg = '#FCECFF';
    text="#ac87fe";
    border = "#F1CBF8";
  }
  
  return {
    style: {
      minHeight:"70px",
      color:text,
      backgroundColor: bg,
      borderColor : border,
      minWidth: `${100}%`,
      marginLeft:ml,
      zIndex : `${event.index}`
    },
  };
}
// foramt hours column in day and week views like this : 00 AM
const formats =  {
  timeGutterFormat: (date, culture, localizer) =>
    localizer.format(date, 'hh A', culture),
}


// const exapndAll = (bool) => {
//   var newSourcesShown = {}
//   var newTypesShown = {}
//   Object.entries(zoomData).map(([source, value])=>{
//     newSourcesShown[source] = bool
//     newTypesShown[source] = {}
//     Object.entries(zoomData[source]).map(([type, value])=>{
//       newTypesShown[source][type] = bool
//     })
//   })
//   setSourcesShown(newSourcesShown)
//   setTypesShown(newTypesShown)
// }

// const myEventsList = [
//   {
//     title: `Oura Readiness - ${ReadinessZoom.display[0].summary_date}`,
//     allDay: true,
//     // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
//     // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
//     start: new Date(parseInt(2022), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
//     end: new Date(parseInt(2022), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
//   }
// ]
  return (
    <Flex
    
    >
    {/* <sideBar
      view={view}
      exapndAll={exapndAll}
      zoomData={zoomData}
      setSourcesShown={setSourcesShown}
      sourcesShown={sourcesShown}
      setTypesShown={setTypesShown}
      typesShown={typesShown}
      lengthCalc={lengthCalc}
      dataView={dataView}
    /> */}
    <SideBar/>
    <Flex
    flexGrow={1}
    direction={"column"}
    justifyContent={"start"}
    >
    <Toolbar onNavigate={onNavigate} date={date} onView={onView} localizer={localizer} view={view} onRangeChange={onRangeChange}/>
      
    <Box  bg={"white"} flexGrow={1} position={"relative"} >
      <Calendar className="calendar"
        localizer={localizer}
        events={myEvents}
        components={{event:Event}}
        eventPropGetter={eventPropGetter}
        backgroundEvents={allDayEvents}
        startAccessor="start"
        endAccessor="end"
        onView={onView}
        view={view}
        onRangeChange={onRangeChange}
        style={{width:"100%" ,padding: " 16px 16px 8px 0px"  }}
        toolbar={false}
        views={views}
        messages={{ year: "Year" }}
        onDrillDown={onDrillDown}
        date={date}
        onNavigate={onNavigate}
        formats={formats}
      />
    </Box >
    
    </Flex>
    </Flex>
  );
}

export default App;
