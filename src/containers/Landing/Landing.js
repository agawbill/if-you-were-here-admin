import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Layout from "../Layout/Layout";
import ScrollToTop from "../../components/UI/ScrollToTop";
import AuthWrapper from "../AuthWrapper";
import { getPersons, fetchMessages, getResources } from "../../store/actions";

const Dashboard = React.lazy(() => import("../Dashboard/Dashboard"));
const Messages = React.lazy(() => import("../MessagesPage/MessagesPage"));
const FullMessage = React.lazy(() =>
  import("../FullMessagePage/FullMessagePage")
);
const Persons = React.lazy(() => import("../PersonPage/PersonPage"));
const Person = React.lazy(() =>
  import("../../components/Persons/Person/Person")
);
const Resources = React.lazy(() => import("../ResourcePage/ResourcePage"));
const Resource = React.lazy(() =>
  import("../../components/Resources/Resource/Resource")
);
const Users = React.lazy(() => import("../UserPage/UserPage"));
const User = React.lazy(() => import("../EditUserPage/EditUserPage"));
const Profile = React.lazy(() => import("../Profile/Profile"));
const Login = React.lazy(() => import("../../components/Login/Login"));

const Landing = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const roles = { all: ["ADMIN", "SUPER_ADMIN"], superAdmin: ["SUPER_ADMIN"] };

  useEffect(() => {
    dispatch(auth());
    if (isAuthenticated) {
      Promise.all([
        dispatch(getPersons()),
        dispatch(fetchMessages()),
        dispatch(getResources()),
      ]);
    }
  }, [dispatch, isAuthenticated]);

  let landingBody = null;

  if (isAuthenticated === null) {
    landingBody = <Spinner />;
  }

  if (isAuthenticated === true) {
    landingBody = (
      <>
        <Layout>
          <ScrollToTop />
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/admin/messages">
                <AuthWrapper roles={roles.all}>
                  <Messages {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/messages/:id">
                <AuthWrapper roles={roles.all}>
                  <FullMessage {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/persons">
                <AuthWrapper roles={roles.all}>
                  <Persons {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/persons/:id">
                <AuthWrapper roles={roles.all}>
                  <Person {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/resources">
                <AuthWrapper roles={roles.all}>
                  <Resources {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/resources/:id">
                <AuthWrapper roles={roles.all}>
                  <Resource {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/users">
                <AuthWrapper roles={roles.superAdmin}>
                  <Users {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/users/:id">
                <AuthWrapper roles={roles.superAdmin}>
                  <User {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin/profile">
                <AuthWrapper roles={roles.all}>
                  <Profile {...props} />
                </AuthWrapper>
              </Route>
              <Route exact path="/admin">
                <AuthWrapper roles={roles.all}>
                  <Dashboard {...props} />
                </AuthWrapper>
              </Route>
              <Redirect to="/admin" />
            </Switch>
          </Suspense>
        </Layout>
      </>
    );
  } else if (isAuthenticated === false) {
    landingBody = (
      <>
        <ScrollToTop />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/admin">
              <Login {...props} />
            </Route>
            <Redirect to="/admin" />
          </Switch>
        </Suspense>
      </>
    );
  }

  return landingBody;
};

export default Landing;
