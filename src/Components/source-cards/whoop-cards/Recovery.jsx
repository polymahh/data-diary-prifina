import { Text, VStack } from "@chakra-ui/react";

const Recovery = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Recovery Score:</Text>
        <Text>
          {aggregateData.recovery_score.max}|{aggregateData.recovery_score.avg}|
          {aggregateData.recovery_score.min}
        </Text>
        <Text>Resting Heart Rate:</Text>
        <Text>
          {aggregateData.resting_heart_rate.max}|
          {aggregateData.resting_heart_rate.avg}|
          {aggregateData.resting_heart_rate.min}
        </Text>
        <Text>RMSSD:</Text>
        <Text>
          {aggregateData.hrv_rmssd_milli.max}|
          {aggregateData.hrv_rmssd_milli.avg}|
          {aggregateData.hrv_rmssd_milli.min}
        </Text>
        <Text>SpO2:</Text>
        <Text>
          {aggregateData.spo2_percentage.max}|
          {aggregateData.spo2_percentage.avg}|
          {aggregateData.spo2_percentage.min}
        </Text>
        <Text>Skin Temp:</Text>
        <Text>
          {aggregateData.skin_temp_celsius.max}|
          {aggregateData.skin_temp_celsius.avg}|
          {aggregateData.skin_temp_celsius.min}
        </Text>
      </VStack>
    )
  );
};
export default Recovery;
