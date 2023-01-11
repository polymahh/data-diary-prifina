import { Box, Flex, Text, Icon, Center } from "@chakra-ui/react";
import pin_icon from "../assets/pin_icon";

const EventBody = ({ event, icon, setPinned, pinned }) => {
  return (
    <>
      <Flex gap={1} alignItems={"flex-start"}>
        <Box borderRadius={"6px"} bg={`${event.category}.500`}>
          <Icon as={icon} p={1} boxSize={6} color={"gray.100"} />
        </Box>
        <Text pt={1} overflowWrap={"break-word"}>
          {event.title}
        </Text>
      </Flex>

      <Flex>
        <Text>{`${new Date(event.start).toLocaleString()}`}</Text>
      </Flex>
    </>
  );
};
export default EventBody;
