import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuth = (data) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [userRoles, setUserRoles] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { props, roles } = data;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/admin");
    } else {
      if (!userRoles) {
        setUserRoles(roles);
      } else {
        if (userRoles.indexOf(user.role) === -1) {
          props.history.push("/admin");
        }
      }
    }
  }, [isAuthenticated, userRoles, roles, user.role, props.history]);

  return isAuthenticated;
};

export default useAuth;
