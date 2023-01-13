import { Labels } from "./Labels";
import { CalendarIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Flex, Image, Text, VStack } from "@chakra-ui/react";
const SideBar = () => {
  return (
    <Flex
      minW={"fit-content"}
      py={9}
      px={[4, 10, 16]}
      h={"full"}
      spacing={0}
      position={"-webkit-sticky"}
      overflowY={"scroll"}
      style={{
        zIndex: 5,
        position: "sticky",
        top: "-1px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      direction={"column"}
      gap={16}
    >
      <Flex w={"max-content"}>
        <Box>
          <Image src="logo.png" alt="Data Diary" />
        </Box>
        <Text
          px={2}
          fontSize={"24px"}
          fontFamily={"Josefin Sans"}
          color={"logoColor"}
        >
          Data Diary
        </Text>
      </Flex>

      <VStack alignItems={"start"}>
        <Flex
          alignItems={"center"}
          gap={2}
          px={4}
          py={2}
          borderLeftWidth={"3px"}
          borderLeftColor={"primary"}
          color={"primary"}
        >
          <CalendarIcon
            boxSize={5}
            color={"white"}
            bg={"primary"}
            p={1}
            borderRadius={"4px"}
          />
          <Text fontWeight={500}>Calendar</Text>
        </Flex>
        <Flex
          alignItems={"center"}
          gap={2}
          px={4}
          py={2}
          borderLeftWidth={"3px"}
          borderLeftColor={"bg"}
          color={"secondary"}
        >
          <RepeatIcon
            boxSize={5}
            color={"secondary"}
            bg={"bgSecondary"}
            p={1}
            borderRadius={"4px"}
          />
          <Text fontWeight={500}>Compare</Text>
        </Flex>
      </VStack>
      <VStack alignItems={"start"} gap={4}>
        <Text color={"secondary"} fontSize={"20px"} fontWeight={500}>
          VIEW
        </Text>
        <Checkbox color={"primary"} colorScheme={"purple"} defaultChecked>
          Planned
        </Checkbox>
        <Checkbox color={"primary"} colorScheme={"purple"} defaultChecked>
          Tracked
        </Checkbox>
        <Checkbox color={"primary"} colorScheme={"purple"} defaultChecked>
          Predictions
        </Checkbox>
      </VStack>
      <Labels />
    </Flex>
  );
};
export default SideBar;
