import {
  Box,
  Flex,
  Text,
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
  VStack,
} from "@chakra-ui/react";
import Icon_business from "../../assets/business_icon";
import Icon_health from "../../assets/health_icon";
import Icon_fitness from "../../assets/fitness_icon";
import Icon_route from "../../assets/route_icon";
import Icon_personal from "../../assets/personal_icon";
import { useState } from "react";
import EventContext from "../../context/EventContext";
import { useContext } from "react";
import EventPopover from "./EventPopover";
import EventBody from "./EventBody";
import EventPin from "./EventPin";

const Event = ({ event }) => {
  const [pinned, setPinned] = useState(false);
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
      <Popover
        placement="right"
        trigger="hover"
        isOpen={pinned ? true : undefined}
        arrowSize={"none"}
        gutter={14}
        offset={[120, 14]}
      >
        <PopoverTrigger>
          <VStack
            position={"relative"}
            alignItems={"flex-start"}
            onClick={() => setPinned(!pinned)}
          >
            <EventPin pinned={pinned} />
            <EventBody event={event} icon={icons[`icon ${event.category}`]} />
          </VStack>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <EventPin pinned={pinned} />

              <Flex gap={2} alignItems={"center"}>
                <Box borderRadius={"6px"} bg={`${event.category}.500`}>
                  <Icon
                    as={icons[`icon ${event.category}`]}
                    p={1}
                    boxSize={6}
                    color={"gray.100"}
                  />
                </Box>
                <Flex
                  direction={"column"}
                  gap={0}
                  color={`${event.category}.500`}
                >
                  <Text
                    fontSize={"14px"}
                    fontWeight={500}
                    overflowWrap={"break-word"}
                  >
                    {event.title}
                  </Text>
                  <Text fontSize={"12px"}>
                    {`${event.start.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hourCycle: "h12",
                    })} - ${event.end.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hourCycle: "h12",
                    })}`}
                  </Text>
                </Flex>
              </Flex>
            </PopoverHeader>
            <PopoverCloseButton onMouseUp={() => setPinned(false)} />
            <PopoverBody>
              <EventPopover event={event} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};
export default Event;
