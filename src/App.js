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

// context
import { useContext } from "react";
import EventContext from "./context/EventContext";


// formating and sorting the events
var myEventsList = [...ouraEvents,...googleEvents,...whoopEvents]
// background event 
const allDayEvents = myEventsList.filter(item => item.allDay).sort((a,b)=> new Date(a.start) - new Date(b.start))
// non background events
const arrEvents = myEventsList.filter(item => !item.allDay).sort((a,b)=> new Date(a.start) - new Date(b.start))
const myEvents = arrEvents.map(event => {return {...event,overlap:0,index:0}})// index for zIndex and overlap for leftmargin

for(let i = 0 ; i < myEvents.length ; i++ ){
  for(let j = i+1 ; j < myEvents.length; j++){
    let iEnd = new Date(myEvents[i].end)
    let iStart = new Date(myEvents[i].start).getTime()+ (30*60*1000) //if next event overlaping and occurs in next 30min give it leftmargin
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
  const { zoomData,setZoomData } = useContext(EventContext);

  const [view, setView] = useState("week")
  const [date, setDate] = useState(new Date())
  const [range, setRange] = useState({
    start: new Date(localizer.startOf(date, view)),
    end: new Date(localizer.endOf(date, view))
  })

const onView = useCallback((newView) => {
  console.log(newView)
  setView(newView)}, [setView])
const onRangeChange = useCallback((newRange) => setRange(newRange), [setRange])


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

console.log(zoomData)

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



  return (
    <Flex>
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
