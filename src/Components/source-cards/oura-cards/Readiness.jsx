import { Text, VStack } from "@chakra-ui/react";

const Readiness = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Score: {aggregateData.score}%</Text>
        <Text>Previous Night Score: {aggregateData.score_previous_night}%</Text>
        <Text>Sleep Balance Score: {aggregateData.score_sleep_balance}%</Text>
        <Text>Previous Day Score: {aggregateData.score_previous_day}%</Text>
        <Text>
          Activity Balance Score: {aggregateData.score_activity_balance}%
        </Text>
        <Text>Resting HR Score: {aggregateData.score_resting_hr}%</Text>
        <Text>HRV Balance Score: {aggregateData.score_hrv_balance}%</Text>
        <Text>Recovery Index Score: {aggregateData.score_recovery_index}%</Text>
        <Text>Temperature Score: {aggregateData.score_temperature}%</Text>
      </VStack>
    )
  );
};
export default Readiness;
