import { useState } from "react";
import { createContext } from "react";

const EventContext = createContext()

export const EventProvider = ({children})=>{

    const [zoomData,setZoomData] = useState(null)

    return (
        <EventContext.Provider value={{zoomData,setZoomData}}>
            {children}
        </EventContext.Provider>
    )

}

export default EventContext