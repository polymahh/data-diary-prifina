import "./App.css"
import "./sass/styles.scss"

// import './calendar.css';

import { Calendar, momentLocalizer,Views, } from 'react-big-calendar'
import moment from 'moment'
import {
  getReadinessSummaryWeekData,
  getSleepSummaryWeekData,
  getActivitySummaryWeekData
} from "./zoom-data/ouraZoom.js"
import {
  getGoogleActivityWeekData,
  getGoogleLocationWeekData,
  getGooglePlacesWeekWeekData,
  getGoogleRoutesWeekWeekData,
} from "./zoom-data/googleZoom.js"
import {
  getWhoopWorkoutWeekData,
  getWhoopSleepWeekData,
  getWhoopRecoveryWeekData,
  getWhoopCycleWeekData
} from "./zoom-data/whoopZoom"
import { useState,useCallback, useEffect } from "react";
import Year from "./Year";
import React, { Fragment, useMemo } from 'react'

// events
import {ouraEvents} from "./Events/ouraEvents"
import {googleEvents} from "./Events/googleEvents"
import {whoopEvents} from "./Events/whoopEvents"
import SideBar from "./Components/SideBar/SideBar";
import Toolbar from "./Components/Toolbar"
import { Box, calc, Container, Flex, HStack, VStack } from "@chakra-ui/react"
import DaysRow from "./Components/DaysRow"
// const localizer = Calendar.momentLocalizer(moment); // or globalizeLocalizer
// localizer.formats.yearHeaderFormat = "YYYY";



const varToString = (attr) => {
  var str = attr.split("_")
  for (var i = 0; i< str.length; i++){
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  str = str.join(" ")
  return str
}
var myEventsList = [...ouraEvents,...googleEvents,...whoopEvents]
const allDayEvents = myEventsList.filter(item => item.allDay)
const myEvents = myEventsList.filter(item => !item.allDay)

console.log(myEventsList)


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

  const finalDay = () => {
    var date = new Date()
    
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date.getDate()
    
  }
  const [range, setRange] = useState({
    start: new Date(`${new Date().getFullYear()}-${(new Date()).getMonth()+1}-01`),
    end: new Date(`${new Date().getFullYear()}-${(new Date()).getMonth()+1}-${finalDay()}`)
  })
  console.log(range)
  const [test, setTest] = useState(null)
  const [view, setView] = useState("month")
  const [zoomData, setZoomData] = useState(0)
  const [sourcesShown, setSourcesShown] = useState({})
  const [typesShown, setTypesShown] = useState({})
  const [date, setDate] = useState(new Date())


const onView = useCallback((newView) => {
  console.log(newView)
  setView(newView)}, [setView])
const onRangeChange = (newRange) => {
  console.log("newRange",newRange)
  setRange(newRange)}
const onSelectEvent = (event) => {
  // console.log(event)
  window.alert(JSON.stringify(event.data))}
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
const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
// const ReadinessZoom = getReadinessSummaryWeekData("ReadinessWeek",7)
// console.log("ReadinessZoom", ReadinessZoom)
// console.log()


// const getZoomData = () => {
//   var finalData = {}
//   var sourceData = {}
//   var typesShown = {}
//   var filteredData
//   console.log("getZoomData")
//   console.log("RANGE", range)
//   if (view === "week"){
//     // filter events that are in the same week range
//     filteredData = myEventsList.filter((event)=>{
//       // console.log("",event)
//       for (var i = 0; i< range.length;i++){
//         if (range[i].getFullYear() === event.start.getFullYear()&&range[i].getMonth() === event.start.getMonth()&&range[i].getDate() === event.start.getDate()){
//           return true
//         }
//       }
//       return false
//     })
//     console.log(filteredData)

//     //Get All Sources
//     var sources = {}
    
//     for (var i = 0; i< filteredData.length;i++){
//       if (sources[filteredData[i].data.prifinaSourceType]===undefined){
        
//         sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
//       } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
//         sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
//       }
//     }
//     // sources are every sourceType "oura,google..." with array of thier eventTypes "readiness,sleep..."
//     // console.log(sources)
//     Object.entries(sources).forEach(([key, value])=>{
//       // key is sourceTypes ex "oura,google.."  and value is arr ex [readiness,sleep...]
//       finalData[key] = {}
//       sourceData[key] = false
//       typesShown[key] = {}

//       switch(key){
//         case "Oura":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Readiness":
//                 finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "SleepSummary":
//                 finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Activity":
//                 finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               default:
//                 break
//             }
//           })
//           break
//         case "Google":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Activity":
//                 finalData[key][type] = getGoogleActivityWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Location":
//                 finalData[key][type] = getGoogleLocationWeekData("LocationWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Route":
//                 finalData[key][type] = getGoogleRoutesWeekWeekData("RoutesWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Place":
//                 finalData[key][type] = getGooglePlacesWeekWeekData("PlacesWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               default:
//                 break
//             }
//           })
//           break
//         case "Whoop":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Cycle":
//                 finalData[key][type] = getWhoopCycleWeekData("CycleWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Recovery":
//                 finalData[key][type] = getWhoopRecoveryWeekData("RecoveryWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Sleep":
//                 finalData[key][type] = getWhoopSleepWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Workout":
//                 finalData[key][type] = getWhoopWorkoutWeekData("WorkoutWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               default:
//                 break
//             }
//           })
//           break    
//         default:
//           break
//       }
//     })

//     //Collect All Data Based on Source and Group (e.g. Readiness)

//     //Execute Zoom
//     // finalData = {
//     //   "oura":
//     //     "readiness":
//     //       "aggrega te"
//     //       "aggregate"
//     // }
    
//   } else if (view === "month") {

//     filteredData = myEventsList.filter((event)=>{
//       // console.log("",event)
//         // console.log(range[i].getDate())
//         if (range["start"].getTime() < event.start.getTime()&&range["end"].getTime() > event.start.getTime()){
//           return true
//         } else {
//           return false
//         }
//     })
//     console.log(filteredData)
//     var sources = {}
//     for (var i = 0; i< filteredData.length;i++){
//       if (sources[filteredData[i].data.prifinaSourceType]===undefined){
//         sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
//       } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
//         sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
//       }
//     }
//     // console.log(sources)
//     Object.entries(sources).forEach(([key, value])=>{
//       finalData[key] = {}
//       sourceData[key] = false
//       typesShown[key] = {}

//       switch(key){
//         case "Oura":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Readiness":
//                 finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "SleepSummary":
//                 finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Activity":
//                 finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               default:
//                 break
//             }
//           })
//           break
//         case "Google":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Activity":
//                 finalData[key][type] = getGoogleActivityWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Location":
//                 finalData[key][type] = getGoogleLocationWeekData("LocationWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Route":
//                 finalData[key][type] = getGoogleRoutesWeekWeekData("RoutesWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Place":
//                 finalData[key][type] = getGooglePlacesWeekWeekData("PlacesWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               default:
//                 break
//             }
//           })
//           break
//         case "Whoop":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Cycle":
//                 finalData[key][type] = getWhoopCycleWeekData("CycleWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Recovery":
//                 finalData[key][type] = getWhoopRecoveryWeekData("RecoveryWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Sleep":
//                 finalData[key][type] = getWhoopSleepWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Workout":
//                 finalData[key][type] = getWhoopWorkoutWeekData("WorkoutWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               default:
//                 break
//             }
//           })
//           break    
//         default:
//           break
//       }
//     })
//   } else if (view === "year") {
//     var start = range[0]
//     var end = new Date("2022-01-01")
//     end.setFullYear(start.getFullYear() + 1)

//     filteredData = myEventsList.filter((event)=>{
//       // console.log("",event)
//         // console.log(range[i].getDate())
//         if (start.getTime() < event.start.getTime()&&end.getTime() > event.start.getTime()){
//           return true
//         } else {
//           return false
//         }
//     })
//     console.log(filteredData)
//     var sources = {}
//     for (var i = 0; i< filteredData.length;i++){
//       if (sources[filteredData[i].data.prifinaSourceType]===undefined){
//         sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
//       } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
//         sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
//       }
//     }
//     // console.log(sources)
//     Object.entries(sources).forEach(([key, value])=>{
//       finalData[key] = {}
//       sourceData[key] = false
//       typesShown[key] = {}

//       switch(key){
//         case "Oura":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Readiness":
//                 finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "SleepSummary":
//                 finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Activity":
//                 finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               default:
//                 break
//             }
//           })
//           break
//         case "Google":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Activity":
//                 finalData[key][type] = getGoogleActivityWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Location":
//                 finalData[key][type] = getGoogleLocationWeekData("LocationWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Route":
//                 finalData[key][type] = getGoogleRoutesWeekWeekData("RoutesWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               case "Place":
//                 finalData[key][type] = getGooglePlacesWeekWeekData("PlacesWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 // console.log(finalData[key])
//                 break
//               default:
//                 break
//             }
//           })
//           break
//         case "Whoop":
//           value.forEach((type)=>{
//             finalData[key][type] = {}
//             typesShown[key][type] = false
//             switch(type){
//               case "Cycle":
//                 finalData[key][type] = getWhoopCycleWeekData("CycleWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Recovery":
//                 finalData[key][type] = getWhoopRecoveryWeekData("RecoveryWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Sleep":
//                 finalData[key][type] = getWhoopSleepWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               case "Workout":
//                 finalData[key][type] = getWhoopWorkoutWeekData("WorkoutWeek",[].concat(...filteredData.filter((event)=>{
//                   if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
//                     return true
//                   } else {
//                     return false
//                   }
//                 }).map(b=>b.data)) )
//                 break
//               default:
//                 break
//             }
//           })
//           break        
//         default:
//           break
//       }
//     })
//   }
//   console.log(finalData)
//   // console.log("sd",sourceData)
//   setZoomData(finalData)
//   setSourcesShown(sourceData)
//   setTypesShown(typesShown)


// }

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
const millisecondsDisplay = (total) => {
  var totalSeconds = Math.floor(total/1000)
  var milliseconds = total%1000
  var hours = Math.floor(Math.floor(totalSeconds / 60)/60)
  var mintues = Math.floor(totalSeconds / 60)%60
  var seconds = totalSeconds % 60
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
  return `${hours}:${mintues}:${seconds}.${milliseconds}`
}

// useEffect(() => {
//   //Runs only on the first render
//   getZoomData()
//   // console.log(zoomData)
// }, [range]);

// useEffect(() => {
//   //Runs only on the first render
//   getZoomData()
//   // console.log(zoomData)
// }, [test]);

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
    <Toolbar onNavigate={onNavigate} date={date} onView={onView} localizer={localizer} view={view}/>
      
    <Box  bg={"white"} flexGrow={1} >
      <Calendar className="calendar"
        localizer={localizer}
        events={myEvents}
        backgroundEvents={allDayEvents}
        startAccessor="start"
        endAccessor="end"
        onView={onView}
        view={view}
        onRangeChange={onRangeChange}
        style={{width:"100%" ,padding: " 16px 0px 8px 0px"  }}
        onSelectEvent={onSelectEvent}
        toolbar={false}
        views={views}
        messages={{ year: "Year" }}
        onDrillDown={onDrillDown}
        date={date}
        onNavigate={onNavigate}
      />
    </Box >
    </Flex>
    </Flex>
  );
}

export default App;
