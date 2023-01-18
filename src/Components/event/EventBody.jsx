import { Box, Flex, Text, Icon } from "@chakra-ui/react";

const EventBody = ({ event, icon }) => {
  return (
    <>
      <Flex gap={1} alignItems={"flex-start"}>
        <Box borderRadius={"6px"} bg={`${event.category}.500`}>
          <Icon as={icon} p={1} boxSize={6} color={"gray.100"} />
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
export default EventBody;
