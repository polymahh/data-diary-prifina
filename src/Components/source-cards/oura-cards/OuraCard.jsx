import { Text, VStack } from "@chakra-ui/react";
import Activity from "./Activity";
import Readiness from "./Readiness";
import SleepSummary from "./SleepSummary";

const OuraCard = ({ type, aggregateData }) => {
  return (
    <VStack>
      {type === "Activity" ? (
        <Activity aggregateData={aggregateData} />
      ) : type === "Readiness" ? (
        <Readiness aggregateData={aggregateData} />
      ) : type === "SleepSummary" ? (
        <SleepSummary aggregateData={aggregateData} />
      ) : (
        <Text>type not found</Text>
      )}
    </VStack>
  );
};
export default OuraCard;
