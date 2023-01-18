import { Flex, Icon } from "@chakra-ui/react";
import pin_icon from "../../assets/pin_icon";

const EventPin = ({ pinned }) => {
  return (
    <Flex
      borderRadius={"full"}
      bg={`pin`}
      position={"absolute"}
      top={"0.5px"}
      left={"0.5px"}
      justify={"center"}
      alignItems={"center"}
      display={pinned ? "flex" : "none"}
    >
      <Icon as={pin_icon} pl={1} pr={0.5} boxSize={4} color={"gray.100"} />
    </Flex>
  );
};
export default EventPin;
