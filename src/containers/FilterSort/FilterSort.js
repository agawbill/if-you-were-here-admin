import React from "react";
import FilterSortOptions from "../../components/MessageFilterSortOptions/FilterSortOptions";

const FilterSort = (props) => {
  return (
    <>
      <FilterSortOptions type={props.type} />
    </>
  );
};

export default FilterSort;
