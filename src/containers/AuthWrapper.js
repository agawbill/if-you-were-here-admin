import useAuth from "../hooks/useAuth";
import { withRouter } from "react-router-dom";

const AuthWrapper = (props) =>
  useAuth({ props, roles: props.roles }) && props.children;

export default withRouter(AuthWrapper);
