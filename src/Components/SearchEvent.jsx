import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchEvent = () => {
  return (
    <Flex>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="secondary" />}
        />
        <Input
          type="text"
          placeholder="Search"
          _placeholder={{ color: "gray.400" }}
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchEvent;
