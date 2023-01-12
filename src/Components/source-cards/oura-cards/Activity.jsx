import { Text, VStack } from "@chakra-ui/react";

const Activity = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Average Score: {aggregateData.score}%</Text>
        <Text>
          Average Day Movement: {aggregateData.movement.avgSteps} steps +{" "}
          {aggregateData.movement.avgMovement}m
        </Text>
        <Text>
          Total Movement: {aggregateData.movement.totalSteps} steps +{" "}
          {aggregateData.movement.totalMovement}m
        </Text>
        <Text>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</Text>
        <Text>Inactivity Alerts: {aggregateData.inactivity_alerts}</Text>
        <Text>
          Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/
          {aggregateData.cals.totalCalTotal}{" "}
          <i>
            ({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})
          </i>
        </Text>
        <Text>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</Text>
        <Text>Highest MET Level: {aggregateData.met.high} MET</Text>
        <Text>Lowest MET Level: {aggregateData.met.low} MET</Text>
      </VStack>
    )
  );
};
export default Activity;
