import { Text, VStack } from "@chakra-ui/react";

const Location = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Average Accuracy: {aggregateData.accuracy}%</Text>
        <Text>
          Average Vertical Accuracy: {aggregateData.verticalAccuracy}%
        </Text>
        <Text>Average Altitude: {aggregateData.altitude}m</Text>
      </VStack>
    )
  );
};
export default Location;
