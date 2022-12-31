import { color, Flex, VStack } from "@chakra-ui/react";
import Event from "./Event";

const EventWrapper = ({ children }) => {
  return (
    <VStack
      bg={"health.200"}
      border={"1px"}
      color={"red"}
      borderColor={"health.300"}
      py={2}
    >
      <p>test</p>
      {children}
    </VStack>
  );
};
export default EventWrapper;
