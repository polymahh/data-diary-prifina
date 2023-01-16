import { useState } from "react";
import { createContext } from "react";
import {ouraEvents} from "../Events/ouraEvents"
import {googleEvents} from "../Events/googleEvents"
import {whoopEvents} from "../Events/whoopEvents"




const EventContext = createContext()

var myEventsList = [...ouraEvents,...googleEvents,...whoopEvents]
const allDayEvents = myEventsList.filter(item => item.allDay).sort((a,b)=> new Date(a.start) - new Date(b.start))
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


export const EventProvider = ({children})=>{

    const [zoomData,setZoomData] = useState(null)
    const [events,setEvents] = useState(myEvents)
    const [footerEvents,setFooterEvents] = useState(allDayEvents)
    const [labels,setLabels] = useState(["health","fitness","route","business","personal"])



const handleLabels = (label)=>{
  if(labels.includes(label)){
    const arr = labels.filter(item => item !== label )
    setLabels(arr)
  }else {
    const arr = [...labels,label]
    setLabels(arr)
  }

} 

const filterByLabels = myEvents.filter(event => labels.includes(event.category)
)

const handleEvents =()=>{
  if(labels[0]){
    console.log("events",myEvents)
    console.log(filterByLabels)
    setEvents(filterByLabels)
  }
}

// console.log("footer",footerEvents)
    return (
        <EventContext.Provider value={{zoomData,setZoomData,events,labels,handleLabels,handleEvents,footerEvents}}>
            {children}
        </EventContext.Provider>
    )

}

export default EventContext