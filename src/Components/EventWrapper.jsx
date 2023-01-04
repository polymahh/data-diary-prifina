import { Box, Flex, Text, VStack, Icon } from "@chakra-ui/react";
import Icon_business from "../assets/business_icon";
import Icon_health from "../assets/health_icon";
import Icon_fitness from "../assets/fitness_icon";
import Icon_route from "../assets/route_icon";
import Icon_personal from "../assets/personal_icon";

const EventWrapper = ({ event }) => {
  const icons = {
    "icon business": Icon_business,
    "icon health": Icon_health,
    "icon route": Icon_route,
    "icon personal": Icon_personal,
    "icon fitness": Icon_fitness,
  };

  const start = new Date(event.start);
  const end = new Date(event.end);

  const eventHeight = start.getTime() - end.getTime();
  console.log(eventHeight);
  return (
    <VStack border={"1px solid red"}>
      <VStack alignItems={"flex-start"}>
        <Flex gap={1} alignItems={"flex-start"}>
          <Box borderRadius={"6px"} bg={`${event.category}.500`}>
            <Icon
              as={icons[`icon ${event.category}`]}
              p={1}
              boxSize={6}
              color={"gray.100"}
            />
          </Box>
          <Text color={"black"} pt={1} overflowWrap={"break-word"}>
            {event.title}
          </Text>
        </Flex>
      </VStack>
    </VStack>
  );
};
export default EventWrapper;
