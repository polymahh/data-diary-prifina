// styles
import "./App.css";
import "./sass/styles.scss";
import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
// react
import { useState, useCallback, useEffect, useMemo } from "react";
// calendar library
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Year from "./Year";

// events and utils
import { ouraEvents } from "./Events/ouraEvents";
import { googleEvents } from "./Events/googleEvents";
import { whoopEvents } from "./Events/whoopEvents";
import { weekZoomData } from "./range-zoom-data/week-zoom-data";

// components
import SideBar from "./Components/SideBar/SideBar";
import Toolbar from "./Components/Toolbar";
import Event from "./Components/event/Event";

// context
import { useContext } from "react";
import EventContext from "./context/EventContext";
import Footer from "./Components/footer/Footer";

// formating and sorting the events
var myEventsList = [...ouraEvents, ...googleEvents, ...whoopEvents];
// background event
const allDayEvents = myEventsList
  .filter((item) => item.allDay)
  .sort((a, b) => new Date(a.start) - new Date(b.start));
// const allEvents = myEventsList.sort((a,b)=> new Date(a.start) - new Date(b.start))
// non background events
const arrEvents = myEventsList
  .filter((item) => !item.allDay)
  .sort((a, b) => new Date(a.start) - new Date(b.start));
const myEvents = arrEvents.map((event) => {
  return { ...event, overlap: 0, index: 0 };
}); // index for zIndex and overlap for leftmargin

for (let i = 0; i < myEvents.length; i++) {
  for (let j = i + 1; j < myEvents.length; j++) {
    let iEnd = new Date(myEvents[i].end);
    let iStart = new Date(myEvents[i].start).getTime() + 30 * 60 * 1000; //if next event overlaping and occurs in next 30min give it leftmargin
    let jStart = new Date(myEvents[j].start);
    if (iEnd.getDate() === jStart.getDate()) {
      myEvents[j].index += 1;
      if (jStart < iStart) {
        myEvents[j].overlap = myEvents[i].overlap + 1;
      }
    }
  }
}

console.log(myEvents);

function App() {
  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const { views } = useMemo(
    () => ({
      views: {
        day: true,
        week: true,
        month: true,
        year: Year,
      },
    }),
    []
  );
  const { zoomData, setZoomData, events, handleEvents, labels } =
    useContext(EventContext);

  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date());
  const [range, setRange] = useState({
    start: new Date(localizer.startOf(date, view)),
    end: new Date(localizer.endOf(date, view)),
  });

  const onView = useCallback(
    (newView) => {
      console.log(newView);
      setView(newView);
    },
    [setView]
  );
  const onRangeChange = useCallback(
    (newRange) => setRange(newRange),
    [setRange]
  );

  const onDrillDown = (newDate) => {
    setDate(new Date(newDate));
    setView("day");
  };
  const onNavigate = useCallback(
    (newDate) => {
      setDate(newDate);
      onRangeChange({
        start: localizer.startOf(newDate, view),
        end: localizer.endOf(newDate, view),
      });
    },
    [setDate]
  );

  useEffect(() => {
    handleEvents();
    getZoomData();
    console.log(range);
    console.log(events);
  }, [range, date, labels]);

  console.log(zoomData);

  const getZoomData = () => {
    // filter events that are in the same week range
    let filteredData = myEventsList.filter((event) => {
      if (
        range["start"].getTime() < event.start.getTime() &&
        range["end"].getTime() > event.start.getTime()
      ) {
        return true;
      }
    });

    let sources = {}; //Get All Sources
    for (var i = 0; i < filteredData.length; i++) {
      //this loop will format sources >>> sources = {oura : [readiness,sleep...]}
      if (sources[filteredData[i].data.prifinaSourceType] === undefined) {
        sources[filteredData[i].data.prifinaSourceType] = [
          filteredData[i].data.prifinaSourceEventType,
        ];
      } else if (
        !sources[filteredData[i].data.prifinaSourceType].includes(
          filteredData[i].data.prifinaSourceEventType
        )
      ) {
        sources[filteredData[i].data.prifinaSourceType].push(
          filteredData[i].data.prifinaSourceEventType
        );
      }
    }
    weekZoomData(filteredData, sources, setZoomData);
    // console.log(sources)
  };

  const eventPropGetter = (event) => {
    // eventPropGetter controls event layout and style
    let bg = "#fff";
    let text = "red";
    let border = "red";
    let ml = `${event.overlap * 40 + 8}px`;
    if (view === "month") {
      ml = "0px";
    }

    if (event.category === "health") {
      bg = "#E7F0FF";
      text = "#73A1F6";
      border = "#CADDFC";
    } else if (event.category === "business") {
      bg = "#EEE7FF";
      text = "#ac87fe";
      border = "#b493fe";
    } else if (event.category === "route") {
      bg = "#E2FBE2";
      text = "#54C250";
      border = "#B1F5AF";
    } else if (event.category === "fitness") {
      bg = "#FFEDE7";
      text = "#F17243";
      border = "#F5CEBF";
    } else if (event.category === "personal") {
      bg = "#FCECFF";
      text = "#ac87fe";
      border = "#F1CBF8";
    }

    return {
      style: {
        minHeight: "40px",
        color: text,
        backgroundColor: bg,
        borderColor: border,
        minWidth: `calc(100% - ${ml})`,
        marginLeft: ml,
        zIndex: `${event.index}`,
        // ":hover":{borderWidth:"2px",borderColor : "red"}
      },
    };
  };
  // overwrite the bgcolor of default curent day
  const dayPropGetter = () => {
    return {
      style: {
        backgroundColor: "white",
      },
    };
  };
  // foramt hours column in day and week views like this : 00 AM
  const formats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "hh A", culture),
  };

  return (
    <Flex width={"100vw"} pos={"relative"}>
      <SideBar />
      <SimpleGrid
        flexGrow={"1"}
        // direction={"column"}
        templateRows={"min-content auto"}
        templateColumns={"1fr"}
        height={"100vh"}
      >
        <Toolbar
          onNavigate={onNavigate}
          date={date}
          onView={onView}
          localizer={localizer}
          view={view}
          onRangeChange={onRangeChange}
          onDrillDown={onDrillDown}
        />

        <Box bg={"white"} overflow={"auto"}>
          <Calendar
            className="calendar"
            localizer={localizer}
            events={events}
            components={{ event: Event }}
            dayPropGetter={dayPropGetter}
            eventPropGetter={eventPropGetter}
            // backgroundEvents={allDayEvents}
            startAccessor="start"
            endAccessor="end"
            onView={onView}
            view={view}
            onRangeChange={onRangeChange}
            style={{ width: "100%", padding: " 16px 16px 8px 0px" }}
            toolbar={false}
            views={views}
            messages={{ year: "Year" }}
            onDrillDown={onDrillDown}
            date={date}
            onNavigate={onNavigate}
            formats={formats}
          />
        </Box>
        <Flex
          p={2}
          width={"full"}
          paddingLeft={"82px"}
          paddingRight={"26px"}
          paddingBottom={"12px"}
          marginTop={"-45px"}
          zIndex={100}
        >
          <Footer view={view} localizer={localizer} date={date} />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}

export default App;
