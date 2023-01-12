import { Text, VStack } from "@chakra-ui/react";
import millisecondsDisplay from "../../../utils/millisecondsDisplay";

const Sleep = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Time Spent Sleeping:</Text>
        <Text>
          {millisecondsDisplay(aggregateData.timeSpent.max)}|
          {millisecondsDisplay(aggregateData.timeSpent.avg)}|
          {millisecondsDisplay(aggregateData.timeSpent.min)}
        </Text>
        <Text>Respiratory Rate:</Text>
        <Text>
          {aggregateData.respiratory_rate.max}|
          {aggregateData.respiratory_rate.avg}|
          {aggregateData.respiratory_rate.min}
        </Text>
        <Text>Sleep Performance:</Text>
        <Text>
          {aggregateData.sleep_performance_percentage.max}|
          {aggregateData.sleep_performance_percentage.avg}|
          {aggregateData.sleep_performance_percentage.min}
        </Text>
        <Text>Sleep Consistency:</Text>
        <Text>
          {aggregateData.sleep_consistency_percentage.max}|
          {aggregateData.sleep_consistency_percentage.avg}|
          {aggregateData.sleep_consistency_percentage.min}
        </Text>
        <Text>Sleep Efficiency:</Text>
        <Text>
          {aggregateData.sleep_efficiency_percentage.max}|
          {aggregateData.sleep_efficiency_percentage.avg}|
          {aggregateData.sleep_efficiency_percentage.min}
        </Text>
        <Text>Disturbance Count: {aggregateData.disturbance_count}</Text>
      </VStack>
    )
  );
};
export default Sleep;
