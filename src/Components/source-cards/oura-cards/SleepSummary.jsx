import { Text, VStack } from "@chakra-ui/react";
import secondsDisplay from "../../../utils/secondsDisplay";

const SleepSummary = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>
          Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/
          {secondsDisplay(aggregateData.sleep.duration)}{" "}
          <i>
            ({secondsDisplay(aggregateData.sleep.avgTotal)}/
            {secondsDisplay(aggregateData.sleep.avgDuration)})
          </i>
        </Text>
        <Text>Average Score: {aggregateData.score}%</Text>
        <Text>Average Efficiency: {aggregateData.efficiency}%</Text>
        <Text>Average Heart Rate: {aggregateData.hr_average}bpm</Text>
        <Text>Average Respiratory Rate: {aggregateData.breath_average}b/m</Text>
        <Text>
          Trend of HRRV: {aggregateData.rmssd.averageTrend > 0 ? "+" : " "}
          {aggregateData.rmssd.averageTrend}
        </Text>
      </VStack>
    )
  );
};
export default SleepSummary;
