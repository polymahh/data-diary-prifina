import { Flex, Text } from "@chakra-ui/react";

const DayItem = ({ day, today }) => {
  return (
    <Flex
      py={2}
      justifyContent={"center"}
      bg={day === today ? "white" : "bg"}
      color={day === today ? "primary" : "secondary"}
      borderRadius={"8px"}
    >
      <Text fontSize={"14px"} noOfLines={1}>
        {day}
      </Text>
    </Flex>
  );
};
export default DayItem;
