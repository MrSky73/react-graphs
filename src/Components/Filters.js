import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Input,
} from "@chakra-ui/react";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";

const Filters = ({ data, setNames }) => {
  const names = data.map((user) => user.Name);
  const [selected, setSelected] = useState([
    { label: "barjraj", value: "barjraj" },
  ]);
  const changeHandler = (response) => {
    setSelected(response);
    setNames(response.map((user) => user.value));
    console.log(selected.map((user) => user.value));
  };

  useEffect(() => {
    setNames(selected.map((user) => user.value));
  }, []);

  return (
    <Box bg="blue.300" w="100%" p={4}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem
          w="100%"
          padding={0}
          colSpan={["5", "3", "2"]}
          maxWidth={"50rem"}
        >
          <MultiSelect
            options={names.map((name) => ({ label: name, value: name }))}
            value={selected}
            onChange={changeHandler}
            // onChange={(opt) => setNames(opt.map((op) => op.value))}
            className="search"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Filters;
