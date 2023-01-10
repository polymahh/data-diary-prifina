import { Text, VStack } from "@chakra-ui/react";
import Recovery from "./Recovery";
import Cycle from "./Cycle";
import Workout from "./Workout";
import Sleep from "./Sleep";

const WhoopCard = ({ type, aggregateData }) => {
  return (
    <VStack>
      {type === "Cycle" ? (
        <Cycle aggregateData={aggregateData} />
      ) : type === "Recovery" ? (
        <Recovery aggregateData={aggregateData} />
      ) : type === "Sleep" ? (
        <Sleep aggregateData={aggregateData} />
      ) : type === "Workout" ? (
        <Workout aggregateData={aggregateData} />
      ) : (
        <Text>type not found</Text>
      )}
    </VStack>
  );
};
export default WhoopCard;
