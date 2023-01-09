import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";
import EventContext from "../context/EventContext";
import GoogleCard from "./source-cards/google-cards/GoogleCard";

const CardsShown = ({ event }) => {
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
  ) : (
    <Box>no zoom data</Box>
  );
};
export default CardsShown;
