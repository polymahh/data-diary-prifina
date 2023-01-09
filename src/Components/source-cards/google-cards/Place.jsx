import { Text, VStack } from "@chakra-ui/react";
import millisecondsDisplay from "../../../utils/millisecondsDisplay";

const Place = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>
          Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}
        </Text>
        <Text>
          Longest Stay: {millisecondsDisplay(aggregateData.timeSpent.max)}
        </Text>
        <Text>
          Shortest Stay: {millisecondsDisplay(aggregateData.timeSpent.min)}
        </Text>
        <Text>
          Average Location Confidence: {aggregateData.locationConfidence}%
        </Text>
        <Text>Average Visit Confidence: {aggregateData.visitConfidence}%</Text>
        <Text>
          High Confidence: {aggregateData.placeConfidence["HIGH_CONFIDENCE"]}
        </Text>
        <Text>
          Medium Confidence:{" "}
          {aggregateData.placeConfidence["MEDIUM_CONFIDENCE"]}
        </Text>
        <Text>
          Low Confidence: {aggregateData.placeConfidence["LOW_CONFIDENCE"]}
        </Text>
      </VStack>
    )
  );
};
export default Place;
