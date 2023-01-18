import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import EventContext from "../../context/EventContext";
import GoogleCard from "../source-cards/google-cards/GoogleCard";
import OuraCard from "../source-cards/oura-cards/OuraCard";
import WhoopCard from "../source-cards/whoop-cards/WhoopCard";

const EventPopover = ({ event }) => {
  const { zoomData } = useContext(EventContext);

  return event.source === "Google" ? (
    <Box>
      {zoomData && (
        <GoogleCard
          type={event.type}
          aggregateData={zoomData?.[event.source]?.[event.type]?.["aggregate"]}
        />
      )}
    </Box>
  ) : event.source === "Oura" ? (
    <Box>
      {zoomData && (
        <OuraCard
          type={event.type}
          aggregateData={zoomData?.[event.source]?.[event.type]?.["aggregate"]}
        />
      )}
    </Box>
  ) : event.source === "Whoop" ? (
    <Box>
      {zoomData && (
        <WhoopCard
          type={event.type}
          aggregateData={zoomData?.[event.source]?.[event.type]?.["aggregate"]}
        />
      )}
    </Box>
  ) : (
    <Box>no zoom data</Box>
  );
};
export default EventPopover;
