import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserReset,
  deleteUser,
  getUsers,
  sortUsersPending,
  sortUsersRegistered,
} from "../../store/actions";
import Modal from "../../components/UI/Modal/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import User from "./User/User";

const Users = (props) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState("pending");
  const pendingUsers = useSelector((state) => state.users.pendingUsers);
  const filteredPending = useSelector((state) => state.users.filteredPending);
  const registeredUsers = useSelector((state) => state.users.registeredUsers);
  const filteredRegistered = useSelector(
    (state) => state.users.filteredRegistered
  );
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    setType(props.type);
  }, [props.type]);

  const selectHandler = (id) => {
    setUserId(id);
    dispatch(editUserReset());
    setShow(true);
  };

  const resetHandler = () => {
    setShow(false);
  };

  const deleteHandler = async (id, type) => {
    await dispatch(deleteUser(id, token));
    await dispatch(getUsers());
    if (type === "pending") {
      dispatch(sortUsersPending());
    } else {
      dispatch(sortUsersRegistered());
    }
    setShow(false);
  };

  let users = null;

  if (type === "pending") {
    if (filteredPending.length > 0) {
      users = filteredPending.map((user, index) => {
        return (
          <span key={index}>
            <ListGroup.Item>
              <User user={user} deleteHandler={selectHandler} type={type} />
            </ListGroup.Item>
          </span>
        );
      });
    } else {
      users =
        pendingUsers && pendingUsers.length > 0
          ? pendingUsers.map((user, index) => {
              return (
                <span key={index}>
                  <ListGroup.Item>
                    <User
                      user={user}
                      type={type}
                      deleteHandler={selectHandler}
                    />
                  </ListGroup.Item>
                </span>
              );
            })
          : "No pending users yet";
    }
  } else if (type === "registered") {
    if (filteredRegistered.length > 0) {
      users = filteredRegistered.map((user, index) => {
        return (
          <span key={index}>
            <ListGroup.Item>
              <User user={user} type={type} deleteHandler={selectHandler} />
            </ListGroup.Item>
          </span>
        );
      });
    } else {
      users =
        registeredUsers && registeredUsers.length > 0
          ? registeredUsers.map((user, index) => {
              return (
                <span key={index}>
                  <ListGroup.Item>
                    <User
                      user={user}
                      type={type}
                      deleteHandler={selectHandler}
                    />
                  </ListGroup.Item>
                </span>
              );
            })
          : "No approved users yet";
    }
  }

  let modalBody = <>Are you sure you want to delete this item?</>;

  return (
    <>
      <Modal
        show={show}
        itemId={userId}
        cancelHandler={resetHandler}
        acceptHandler={deleteHandler}
        title="Delete"
        type={type}
      >
        {modalBody}
      </Modal>
      <ListGroup>{users}</ListGroup>
    </>
  );
};

export default Users;
