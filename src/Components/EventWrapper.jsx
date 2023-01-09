import { Box, Flex, Text, VStack, Icon } from "@chakra-ui/react";
import Icon_business from "../assets/business_icon";
import Icon_health from "../assets/health_icon";
import Icon_fitness from "../assets/fitness_icon";
import Icon_route from "../assets/route_icon";
import Icon_personal from "../assets/personal_icon";
import GoogleCard from "./source-cards/google-cards/GoogleCard";
import { useContext } from "react";
import EventContext from "../context/EventContext";

const EventWrapper = ({ event, children }) => {
  const icons = {
    "icon business": Icon_business,
    "icon health": Icon_health,
    "icon route": Icon_route,
    "icon personal": Icon_personal,
    "icon fitness": Icon_fitness,
  };

  const { zoomData } = useContext(EventContext);

  return (
    <>
      <VStack border={"1px solid red"} height={"-moz-min-content"}>
        <Text>oooo</Text>
        {children}
      </VStack>
    </>
  );
};
export default EventWrapper;
