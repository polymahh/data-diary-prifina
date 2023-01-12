import { Text, VStack } from "@chakra-ui/react";
import millisecondsDisplay from "../../../utils/millisecondsDisplay";

const Cycle = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Time Bound of Cycle:</Text>
        <Text>
          {millisecondsDisplay(aggregateData.timeSpent.max)}|
          {millisecondsDisplay(aggregateData.timeSpent.avg)}|
          {millisecondsDisplay(aggregateData.timeSpent.min)}
        </Text>
        <Text>Strain:</Text>
        <Text>
          {aggregateData.strain.max}|{aggregateData.strain.avg}|
          {aggregateData.strain.min}
        </Text>
        <Text>Kilojoule:</Text>
        <Text>
          {aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|
          {aggregateData.kilojoule.min}
        </Text>
        <Text>Average Heart Rate:</Text>
        <Text>
          {aggregateData.average_heart_rate.max}|
          {aggregateData.average_heart_rate.avg}|
          {aggregateData.average_heart_rate.min}
        </Text>
      </VStack>
    )
  );
};
export default Cycle;
