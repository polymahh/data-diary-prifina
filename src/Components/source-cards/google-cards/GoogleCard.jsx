import Activity from "./Activity";
import Location from "./Location";
import Route from "./Route";
import Place from "./Place";
import { Text, VStack } from "@chakra-ui/react";

const GoogleCard = ({ type, aggregateData }) => {
  return (
    <VStack>
      {type === "Activity" ? (
        <Activity aggregateData={aggregateData} />
      ) : type === "Location" ? (
        <Location aggregateData={aggregateData} />
      ) : type === "Place" ? (
        <Place aggregateData={aggregateData} />
      ) : (
        <Route aggregateData={aggregateData} />
      )}
    </VStack>
  );
};
export default GoogleCard;
