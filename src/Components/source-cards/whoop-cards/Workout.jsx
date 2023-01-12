import { Text, VStack } from "@chakra-ui/react";
import millisecondsDisplay from "../../../utils/millisecondsDisplay";

const Workout = ({ aggregateData }) => {
  return (
    aggregateData && (
      <VStack>
        <Text>Time Spent Working Out:</Text>
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
        <Text>Average Heart Rate:</Text>
        <Text>
          {aggregateData.average_heart_rate.max}|
          {aggregateData.average_heart_rate.avg}|
          {aggregateData.average_heart_rate.min}
        </Text>
        <Text>Max Heart Rate:</Text>
        <Text>
          {aggregateData.max_heart_rate.max}|{aggregateData.max_heart_rate.avg}|
          {aggregateData.max_heart_rate.min}
        </Text>
        <Text>Kilojoule:</Text>
        <Text>
          {aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|
          {aggregateData.kilojoule.min}
        </Text>
        <Text>Distance Travelled:</Text>
        <Text>
          {aggregateData.distance_meter.max}|{aggregateData.distance_meter.avg}|
          {aggregateData.distance_meter.min}
        </Text>
        <Text>Altitude Gain:</Text>
        <Text>
          {aggregateData.altitude_gain_meter.max}|
          {aggregateData.altitude_gain_meter.avg}|
          {aggregateData.altitude_gain_meter.min}
        </Text>
        <Text>Altitude Change:</Text>
        <Text>
          {aggregateData.altitude_change_meter.max}|
          {aggregateData.altitude_change_meter.avg}|
          {aggregateData.altitude_change_meter.min}
        </Text>
        <Text>Zone Duration:</Text>
        <Text>
          {aggregateData.zone_duration.zone_zero_milli.val}(
          {aggregateData.zone_duration.zone_zero_milli.percent}%)|
          <br />
          {aggregateData.zone_duration.zone_one_milli.val}(
          {aggregateData.zone_duration.zone_one_milli.percent}%)|
          <br />
          {aggregateData.zone_duration.zone_two_milli.val}(
          {aggregateData.zone_duration.zone_two_milli.percent}%)|
          <br />
          {aggregateData.zone_duration.zone_three_milli.val}(
          {aggregateData.zone_duration.zone_three_milli.percent}%)|
          <br />
          {aggregateData.zone_duration.zone_four_milli.val}(
          {aggregateData.zone_duration.zone_four_milli.percent}%)|
          <br />
          {aggregateData.zone_duration.zone_five_milli.val}(
          {aggregateData.zone_duration.zone_five_milli.percent}%)|
          <br />
        </Text>
      </VStack>
    )
  );
};
export default Workout;
