import { PhoneIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, VStack, Icon } from "@chakra-ui/react";
import Icon_business from "../assets/business_icon";
import Icon_health from "../assets/health_icon";

const Event = ({ event }) => {
  const icons = {
    "icon business": Icon_business,
    "icon health": Icon_health,
  };
  console.log();
  return (
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
        <Text overflowWrap={"break-word"}>{event.title}</Text>
      </Flex>
    </VStack>
  );
};
export default Event;
