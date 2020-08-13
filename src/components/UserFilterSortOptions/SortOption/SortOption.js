import React, { useState, useEffect } from "react";
import styles from "./SortOption.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSortUsersPending,
  removeSortUsersPending,
  removeSortUsersRegistered,
  addSortUsersRegistered,
} from "../../../store/actions";

const SortOption = (props) => {
  const [selected, setSelected] = useState(false);
  const sort = useSelector((state) => state.users.sort);

  const { filter, sortHandler, sortSelected, name } = props;

  const dispatch = useDispatch();

  const selectHandler = (filter) => {
    setSelected((prevState) => !prevState);
    sortHandler(filter, name);
  };

  useEffect(() => {
    //we need to check to see if the content is filtered-- to determine which array of messages to sort
    //(the filtered ones, or unfiltered)
    if (name === "pending") {
      if (!selected && sort === filter) {
        dispatch(removeSortUsersPending(filter));
      } else if (selected) {
        dispatch(addSortUsersPending(filter));
      }
    } else {
      if (!selected && sort === filter) {
        dispatch(removeSortUsersRegistered(filter));
      } else if (selected) {
        dispatch(addSortUsersRegistered(filter));
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
