import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";
import EventContext from "../context/EventContext";
import GoogleCard from "./source-cards/google-cards/GoogleCard";

const CardsShown = ({ cardsShown }) => {
  const { zoomData } = useContext(EventContext);

  useEffect(() => {
    console.log("card");
  }, [cardsShown]);

  return cardsShown[0] ? (
    cardsShown.map(
      (event) =>
        zoomData &&
        event.source === "Google" && (
          <Box
            position={"absolute"}
            zIndex={180}
            top={"200px"}
            left={0}
            width={"400px"}
            bg={"red"}
            display={event.showCard ? "flex" : "none"}
          >
            <GoogleCard
              type={event.type}
              aggregateData={zoomData[event.source][event.type]["aggregate"]}
            />
          </Box>
        )
    )
  ) : (
    <Box>no evets</Box>
  );
};
export default CardsShown;
