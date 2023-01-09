import { Button, Flex, Text } from "@chakra-ui/react";

const DayItem = ({ day, today }) => {
  return (
    <Flex
      justifyContent={"center"}
      bg={today.includes(day) ? "white" : "bg"}
      color={today.includes(day) ? "primary" : "secondary"}
      borderRadius={"8px"}
    >
      <Button
        variant={"ghost"}
        fontSize={"14px"}
        noOfLines={1}
        _hover={{ background: "none" }}
      >
        {day}
      </Button>
    </Flex>
  );
};
export default DayItem;
