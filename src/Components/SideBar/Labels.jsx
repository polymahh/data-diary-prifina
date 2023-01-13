import { Checkbox, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import EventContext from "../../context/EventContext";

const labelsList = ["Health", "Fitness", "Route", "Business", "Personal"];
export function Labels({}) {
  const { labels, handleLabels } = useContext(EventContext);
  return (
    <VStack alignItems={"start"} gap={4}>
      <Text color={"secondary"} fontSize={"20px"} fontWeight={500}>
        LABELS
      </Text>
      {labelsList.map((item) => (
        <Checkbox
          isChecked={labels.includes(item.toLowerCase())}
          colorScheme={item.toLowerCase()}
          onChange={(event) => {
            console.log(labels);
            handleLabels(item.toLowerCase());
          }}
        >
          {item}
        </Checkbox>
      ))}
    </VStack>
  );
}
