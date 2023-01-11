import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Text,
  IconButton,
  Divider,
  VStack,
  Box,
} from "@chakra-ui/react";
import DaysRow from "./DaysRow";
import RangeMenu from "./RangeMenu";
import SearchEvent from "./SearchEvent";

const Toolbar = ({
  onNavigate,
  date,
  localizer,
  onView,
  view,
  onRangeChange,
  onDrillDown,
}) => {
  // console.log(localizer);
  const start = localizer.startOf(date, view);
  const end = localizer.endOf(date, view);
  const handleNext = () => {
    if (view === "month") {
      onNavigate(localizer.add(date, 1, "month"));
    } else if (view === "week") {
      onNavigate(localizer.add(date, 1, "week"));
    } else if (view === "day") {
      onNavigate(localizer.add(date, 1, "day"));
    } else if (view === "year") {
      onNavigate(localizer.add(date, 1, "year"));
    }
  };

  const handleBack = () => {
    if (view === "month") {
      onNavigate(localizer.add(date, -1, "month"));
    } else if (view === "week") {
      onNavigate(localizer.add(date, -1, "week"));
    } else if (view === "day") {
      onNavigate(localizer.add(date, -1, "day"));
    } else if (view === "year") {
      onNavigate(localizer.add(date, -1, "year"));
    }
  };

  return (
    <VStack
      bg={"bg"}
      pb={4}
      w={"full"}
      spacing={0}
      position={"-webkit-sticky"}
      style={{
        zIndex: 100,
        position: "sticky",
        top: "-1px",
      }}
    >
      <HStack
        bg={"white"}
        gap={4}
        pl={16}
        pr={4}
        py={8}
        w={"full"}
        justify={"space-between"}
      >
        <HStack fontSize={"24px"} fontWeight={500}>
          <Text color={"secondary"}>{localizer.format(date, "MMMM")}</Text>
          <Text color={"number"}>{localizer.format(date, "YYYY")}</Text>
        </HStack>
        <Flex>
          <Button
            variant={"outline"}
            mr={6}
            onClick={() => onNavigate(new Date())}
            px={6}
            fontSize={"14px"}
            fontWeight={400}
            color={"secondary"}
          >
            Today
          </Button>
          <Flex
            borderWidth="1px"
            border={"border"}
            alignItems={"center"}
            borderRadius={"8px"}
          >
            <IconButton
              variant={"outline"}
              border={"none"}
              aria-label="Back"
              icon={<ChevronLeftIcon boxSize={6} color={"secondary"} />}
              onClick={handleBack}
              borderRightRadius={0}
            />
            <Divider
              orientation="vertical"
              h={"60%"}
              borderWidth={"1px"}
              borderColor={"border"}
              mr={2}
            />
            <HStack fontSize={"14px"} fontWeight={400} color={"secondary"}>
              <Text noOfLines={1}>{localizer.format(start, "DD MMM")}</Text>
              <Text>{` - `}</Text>
              <Text noOfLines={1}> {localizer.format(end, "DD MMM")}</Text>
            </HStack>
            <Divider
              orientation="vertical"
              h={"60%"}
              borderWidth={"1px"}
              borderColor={"border"}
              ml={2}
            />
            <IconButton
              variant={"outline"}
              border={"none"}
              aria-label="Next"
              icon={<ChevronRightIcon boxSize={6} color={"secondary"} />}
              onClick={handleNext}
              borderLeftRadius={0}
            />
          </Flex>

          <RangeMenu
            onView={onView}
            view={view}
            onRangeChange={onRangeChange}
            start={start}
            end={end}
          />
        </Flex>
        <SearchEvent />
        {/* avatar */}
      </HStack>
      <Flex w={"full"} bg={"white"} py={2} px={2} mt={-2}>
        <Box minW={view === "week" ? "62px" : "0px"}>{""}</Box>
        <DaysRow
          localizer={localizer}
          view={view}
          date={date}
          onDrillDown={onDrillDown}
        />
      </Flex>
    </VStack>
  );
};
export default Toolbar;
