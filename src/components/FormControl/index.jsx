import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropdownSelect = ({ label, options, value, onChange, index }) => {
  return (
    <FormControl sx={{ mt: 1, width: "100%" }}>
      <InputLabel id={`${label}-label-${index}`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label-${index}`}
        id={`${label}-${index}`}
        value={value}
        label={label}
        onChange={(event) => onChange(index, event)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
