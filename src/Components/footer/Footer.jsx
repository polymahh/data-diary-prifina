import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import EventContext from "../../context/EventContext";
import FooterPopover from "./FooterPopover";
import FooterEvents from "./FooterPopover";

const Footer = ({ localizer, date, view }) => {
  const { footerEvents } = useContext(EventContext);

  const weekArr = [];

  const start = localizer.startOf(date, "week");
  for (let i = 0; i < 7; i++) {
    const day = localizer.add(start, i, "day");
    weekArr.push(day);
  }

  return view === "week" ? (
    <Grid
      templateColumns="repeat(7, 1fr)"
      bg={"white"}
      p={2}
      pt={0}
      gap={2}
      borderRadius={"8px"}
      width={"full"}
      shadow={"md"}
    >
      {weekArr.map((day, idx) => {
        const dayEvents = footerEvents.filter((event) =>
          localizer.isSameDate(event.start, day)
        );
        return <FooterPopover dayEvents={dayEvents} />;
      })}
    </Grid>
  ) : view === "day" ? (
    <Flex
      w={"full"}
      justifyItems={"stretch"}
      bg={"white"}
      shadow={"md"}
      p={2}
      borderRadius={"8px"}
    >
      <Text>test</Text>
    </Flex>
  ) : null;
};
export default Footer;
