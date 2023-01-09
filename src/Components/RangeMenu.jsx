import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const menuArr = ["day", "week", "month", "year"];

const RangeMenu = ({ onView, view, onRangeChange, start, end }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        ml={6}
        bg={"white"}
        borderWidth="1px"
        border={"border"}
        fontSize={"14px"}
        fontWeight={400}
        rightIcon={<ChevronDownIcon boxSize={6} />}
        color={"secondary"}
      >
        {`${view[0].toUpperCase()}${view.slice(1)} View`}
      </MenuButton>
      <MenuList zIndex={10}>
        {menuArr.map((menu, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              onView(menu);
              onRangeChange({ start, end });
            }}
          >
            {menu}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default RangeMenu;
