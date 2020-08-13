import React, { useState, useEffect } from "react";
import styles from "./SortOption.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSortPending,
  removeSortPending,
  removeSortApproved,
  addSortApproved,
} from "../../../store/actions";

const SortOption = (props) => {
  const [selected, setSelected] = useState(false);
  const sort = useSelector((state) => state.messages.sort);
  const dispatch = useDispatch();
  const { filter, sortHandler, sortSelected, name } = props;

  const selectHandler = (filter) => {
    setSelected((prevState) => !prevState);
    sortHandler(filter, name);
  };

  useEffect(() => {
    //we need to check to see if the content is filtered-- to determine which array of messages to sort
    //(the filtered ones, or unfiltered)
    if (name === "pending") {
      if (!selected && sort === filter) {
        dispatch(removeSortPending(filter));
      } else if (selected) {
        dispatch(addSortPending(filter));
      }
    } else {
      if (!selected && sort === filter) {
        dispatch(removeSortApproved(filter));
      } else if (selected) {
        dispatch(addSortApproved(filter));
      }
    }
  }, [selected]);

  useEffect(() => {
    if (sortSelected !== filter) {
      setSelected(false);
    }
  }, [sortSelected]);

  return (
    <div
      className={selected ? styles.SortOptionSelected : styles.SortOption}
      onClick={() => selectHandler(filter)}
    >
      {props.filter}
    </div>
  );
};

export default SortOption;
