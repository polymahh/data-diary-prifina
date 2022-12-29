import { CalendarIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Flex, Image, Text, VStack } from "@chakra-ui/react";
import sidebar from "./SideBar.module.css";
const SideBar = () => {
  return (
    <Flex py={9} px={[4, 10, 16]} h={"full"} direction={"column"} gap={16}>
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
      <VStack alignItems={"start"} gap={4}>
        <Text color={"secondary"} fontSize={"20px"} fontWeight={500}>
          LABELS
        </Text>
        <Checkbox colorScheme={"cyan"} textColor={"primary"} defaultChecked>
          Health
        </Checkbox>
        <Checkbox colorScheme={"orange"} textColor={"primary"} defaultChecked>
          Fitness
        </Checkbox>
        <Checkbox colorScheme={"green"} textColor={"primary"} defaultChecked>
          Route
        </Checkbox>
        <Checkbox colorScheme={"purple"} textColor={"primary"} defaultChecked>
          Business
        </Checkbox>
        <Checkbox colorScheme={"pink"} textColor={"primary"} defaultChecked>
          Personal
        </Checkbox>
      </VStack>
    </Flex>
  );
};
export default SideBar;
