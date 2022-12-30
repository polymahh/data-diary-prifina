import { Flex, Text } from "@chakra-ui/react";

const DayItem = ({ day, today }) => {
  return (
    <Flex
      py={2}
      justifyContent={"center"}
      bg={today.includes(day) ? "white" : "bg"}
      color={today.includes(day) ? "primary" : "secondary"}
      borderRadius={"8px"}
    >
      <Text fontSize={"14px"} noOfLines={1}>
        {day}
      </Text>
    </Flex>
  );
};
export default DayItem;
