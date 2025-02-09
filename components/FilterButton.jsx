/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the filter button, including layout, design, and functionality.
 */

import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material'; // Import Material UI components

const FilterButton = ({ onFilterChange }) => {
  // State for currently selected filter
  const [filter, setFilter] = useState("totalCases"); 

  // State for managing dropdown menu positioning
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle button click to open the dropdown
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing of the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle selection of a new filter option
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    onFilterChange(newFilter); // Pass selected filter to parent component (Heatmap)
    handleClose(); // Close the dropdown menu after selection
  };

  return (
    <div>
      {/* Filter selection button */}
      <Button
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
      >
        {`Filter: ${filter.replace(/([A-Z])/g, ' $1')}`} {/* Formatting camelCase to readable text */}
      </Button>

      {/* Dropdown menu for selecting a filter */}
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleFilterChange("totalCases")}>Total Cases</MenuItem>
        <MenuItem onClick={() => handleFilterChange("activeCases")}>Active Cases</MenuItem>
        <MenuItem onClick={() => handleFilterChange("deaths")}>Deaths</MenuItem>
      </Menu>
    </div>
  );
};

export default FilterButton;
