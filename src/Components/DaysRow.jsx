import { Box, Flex, Grid, HStack, Text } from "@chakra-ui/react";
import DayItem from "./DayItem";

const DaysRow = ({ localizer, view, date }) => {
  const monthArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
      p={2}
      borderRadius={"8px"}
    >
      {weekArr.map((day) => (
        <DayItem day={day} today={today} />
      ))}
    </Grid>
  ) : view === "month" ? (
    <Grid
      w={"full"}
      justifyItems={"stretch"}
      templateColumns="repeat(7, 1fr)"
      bg={"bg"}
      p={2}
      borderRadius={"8px"}
    >
      {monthArr.map((day) => (
        <DayItem day={day} today={today} />
      ))}
    </Grid>
  ) : null;
};
export default DaysRow;
