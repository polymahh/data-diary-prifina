import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import FooterEvent from "./FooterEvent";

const FooterPopover = ({ dayEvents }) => {
  return (
    <Popover placement={"top"}>
      <PopoverTrigger>
        <Center px={4}>
          <ChevronUpIcon />
        </Center>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>All day events</PopoverHeader>
        <PopoverBody>
          <Flex gap={2} direction={"column"}>
            {dayEvents &&
              dayEvents.map((event) => <FooterEvent event={event} />)}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default FooterPopover;
