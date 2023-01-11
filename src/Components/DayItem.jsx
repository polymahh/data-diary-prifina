import { Button, Flex } from "@chakra-ui/react";

const DayItem = ({ day, localizer, onDrillDown }) => {
  let isToday = localizer.isSameDate(new Date(), day);
  return (
    <Flex
      justifyContent={"center"}
      bg={isToday ? "white" : "bg"}
      color={isToday ? "primary" : "secondary"}
      borderRadius={"8px"}
    >
      <Button
        onClick={() => onDrillDown(day)}
        variant={"ghost"}
        fontSize={"14px"}
        noOfLines={1}
        _hover={{ background: "none" }}
        _focus={{ background: "none" }}
      >
        {typeof day === "string" ? day : localizer.format(day, "dddd DD")}
      </Button>
    </Flex>
  );
};
export default DayItem;
