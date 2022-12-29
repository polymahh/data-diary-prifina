import { Box, Flex, Grid, HStack, Text } from "@chakra-ui/react";

const DaysRow = ({ localizer, view, date }) => {
  const monthArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satyurday",
  ];
  const weekArr = [];

  const today = localizer.format(date, "dddd DD");
  const start = localizer.startOf(date, "week");
  for (let i = 0; i < 7; i++) {
    const day = localizer.add(start, i, "day");
    weekArr.push(localizer.format(day, "dddd DD"));
  }
  return view === "week" ? (
    <Grid
      w={"full"}
      justifyItems={"stretch"}
      templateColumns="repeat(7, 1fr)"
      bg={"bg"}
      py={2}
      borderRadius={"8px"}
    >
      {weekArr.map((day) => (
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
      ))}
    </Grid>
  ) : view === "month" ? (
    <Grid
      w={"full"}
      justifyItems={"stretch"}
      templateColumns="repeat(7, 1fr)"
      bg={"bg"}
      py={2}
      borderRadius={"8px"}
    >
      {monthArr.map((day) => (
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
      ))}
    </Grid>
  ) : null;
};
export default DaysRow;
