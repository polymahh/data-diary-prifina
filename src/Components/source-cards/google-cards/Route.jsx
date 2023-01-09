import { Text, VStack } from "@chakra-ui/react";
import millisecondsDisplay from "../../../utils/millisecondsDisplay";

const Route = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>
          Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}
        </Text>
        <Text>
          Longest Route: {millisecondsDisplay(aggregateData.timeSpent.max)}
        </Text>
        <Text>
          Shortest Route: {millisecondsDisplay(aggregateData.timeSpent.min)}
        </Text>
        <Text>Average Distance: {aggregateData.distance.avg}</Text>
        <Text>Max Distance: {aggregateData.distance.max}</Text>
        <Text>Minimum Distance: {aggregateData.distance.min}</Text>
        <Text>High Confidence: {aggregateData.confidence["HIGH"]}</Text>
        <Text>Medium Confidence: {aggregateData.confidence["MEDIUM"]}</Text>
        <Text>Low Confidence: {aggregateData.confidence["LOW"]}</Text>
      </VStack>
    )
  );
};
export default Route;
