import { Text, VStack } from "@chakra-ui/react";

const Activity = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Still Activities: {aggregateData?.types["STILL"]}</Text>
        <Text>In Vehicle Activities: {aggregateData?.types["IN_VEHICLE"]}</Text>
        <Text>Unknown Activities: {aggregateData?.types["UNKNOWN"]}</Text>
        <Text>Average Confidence: {aggregateData?.confidence}%</Text>
      </VStack>
    )
  );
};
export default Activity;
