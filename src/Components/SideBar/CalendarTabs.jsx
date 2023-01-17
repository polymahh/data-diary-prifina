import { CalendarIcon, RepeatIcon } from "@chakra-ui/icons";
import { Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { useState } from "react";

const CalendarTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs orientation={"vertical"} onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab
          px={2}
          gap={2}
          borderLeft={"3px solid #F6F5FA"}
          _selected={{ borderLeft: "3px solid #8675CB" }}
        >
          <CalendarIcon
            boxSize={5}
            color={tabIndex ? "secondary" : "white"}
            bg={tabIndex ? "bgSecondary" : "primary"}
            p={1}
            borderRadius={"4px"}
          />
          <Text>Clendar</Text>
        </Tab>
        <Tab
          gap={2}
          borderLeft={"3px solid #F6F5FA"}
          _selected={{ borderLeft: "3px solid #8675CB" }}
        >
          <RepeatIcon
            boxSize={5}
            color={tabIndex ? "white" : "secondary"}
            bg={tabIndex ? "primary" : "bgSecondary"}
            p={1}
            borderRadius={"4px"}
          />
          <Text>Compare</Text>
        </Tab>
      </TabList>
    </Tabs>
  );
};
export default CalendarTabs;
