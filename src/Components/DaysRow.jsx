import { Grid } from "@chakra-ui/react";
import DayItem from "./DayItem";

const DaysRow = ({ localizer, view, date, onDrillDown }) => {
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

  const start = localizer.startOf(date, "week");
  for (let i = 0; i < 7; i++) {
    const day = localizer.add(start, i, "day");
    weekArr.push(day);
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
        <DayItem
          key={day}
          day={day}
          localizer={localizer}
          onDrillDown={onDrillDown}
        />
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
        <DayItem
          key={day}
          day={day}
          localizer={localizer}
          onDrillDown={() => {}}
        />
      ))}
    </Grid>
  ) : null;
};
export default DaysRow;
