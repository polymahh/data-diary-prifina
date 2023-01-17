import { Labels } from "./Labels";
import { CalendarIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import CalendarTabs from "./CalendarTabs";
const SideBar = () => {
  return (
    <Flex
      minW={"fit-content"}
      py={9}
      px={[4, 10, 16]}
      h={"100vh"}
      overflow={"scroll"}
      style={{
        zIndex: 5,
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
      gap={8}
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

      {/* tabs menu */}
      <CalendarTabs />
      <Divider />
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
      <Divider />
      <Labels />
    </Flex>
  );
};
export default SideBar;
