import { Route } from "react-router-dom";

const PublicRoute = ({ element: element, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <element {...props} />
      </Layout>
    )}
  />
);

export default PublicRoute;
