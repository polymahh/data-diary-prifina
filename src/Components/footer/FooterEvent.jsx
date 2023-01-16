import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Icon_health from "../../assets/health_icon";
import Icon_fitness from "../../assets/fitness_icon";
import Icon_route from "../../assets/route_icon";
import Icon_personal from "../../assets/personal_icon";
import Icon_business from "../../assets/business_icon";
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
      <Flex gap={1} alignItems={"flex-start"}>
        <Box borderRadius={"6px"} bg={`${event.category}.500`}>
          <Icon
            as={icons[`icon ${event.category}`]}
            p={1}
            boxSize={6}
            color={"gray.100"}
          />
        </Box>
        <Text overflowWrap={"break-word"}>{event.source}</Text>
      </Flex>

      <Flex>
        <Text>
          {event.allDay ? null : `${new Date(event.start).toLocaleString()}`}
        </Text>
      </Flex>
    </>
  );
};
export default FooterEvent;
