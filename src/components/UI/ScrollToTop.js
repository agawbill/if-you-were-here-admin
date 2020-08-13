import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = (props) => {
  useEffect(() => {
    const unlisten = props.history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [props.history]);

  return null;
};

export default withRouter(ScrollToTop);
