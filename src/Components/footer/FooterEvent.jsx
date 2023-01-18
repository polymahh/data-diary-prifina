import {
  Box,
  Flex,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import Icon_health from "../../assets/health_icon";
import Icon_fitness from "../../assets/fitness_icon";
import Icon_route from "../../assets/route_icon";
import Icon_personal from "../../assets/personal_icon";
import Icon_business from "../../assets/business_icon";
import EventPopover from "../event/EventPopover";
const icons = {
  "icon business": Icon_business,
  "icon health": Icon_health,
  "icon route": Icon_route,
  "icon personal": Icon_personal,
  "icon fitness": Icon_fitness,
};

const FooterEvent = ({ event }) => {
  return (
    <>
      <Popover placement={"top"}>
        <PopoverTrigger>
          <Flex gap={1} alignItems={"flex-start"} cursor={"pointer"}>
            <Box borderRadius={"6px"} bg={`${event.category}.500`}>
              <Icon
                as={icons[`icon ${event.category}`]}
                p={1}
                boxSize={6}
                color={"gray.100"}
              />
            </Box>
            <Text overflowWrap={"break-word"}>{event.type}</Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{event.type}</PopoverHeader>
          <PopoverBody>
            <EventPopover event={event} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default FooterEvent;
