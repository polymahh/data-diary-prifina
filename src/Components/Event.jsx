import { PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  VStack,
  Icon,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import Icon_business from "../assets/business_icon";
import Icon_health from "../assets/health_icon";
import Icon_fitness from "../assets/fitness_icon";
import Icon_route from "../assets/route_icon";
import Icon_personal from "../assets/personal_icon";
import GoogleCard from "./source-cards/google-cards/GoogleCard";
import { useState } from "react";
import EventContext from "../context/EventContext";
import { useContext } from "react";
import CardsShown from "./CardsShown";

const Event = ({ event }) => {
  const [showCard, setShowCArd] = useState(false);
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
      <Popover>
        <PopoverTrigger>
          <VStack alignItems={"flex-start"} left={0} position={"relative"}>
            <Flex gap={1} alignItems={"flex-start"}>
              <Box borderRadius={"6px"} bg={`${event.category}.500`}>
                <Icon
                  as={icons[`icon ${event.category}`]}
                  p={1}
                  boxSize={6}
                  color={"gray.100"}
                />
              </Box>
              <Text pt={1} overflowWrap={"break-word"}>
                {event.title}
              </Text>
            </Flex>

            <Flex>
              <Text>{`${new Date(event.start).toLocaleString()}`}</Text>
            </Flex>
          </VStack>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <Flex gap={4} alignItems={"flex-start"}>
                <Box borderRadius={"6px"} bg={`${event.category}.500`}>
                  <Icon
                    as={icons[`icon ${event.category}`]}
                    p={1}
                    boxSize={6}
                    color={"gray.100"}
                  />
                </Box>
                <Text overflowWrap={"break-word"}>{event.title}</Text>
              </Flex>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <CardsShown event={event} />
            </PopoverBody>
            <PopoverFooter>This is the footer</PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};
export default Event;
