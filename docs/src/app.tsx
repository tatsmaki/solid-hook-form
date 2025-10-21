import { Link, MetaProvider, Title, Meta } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Header } from "./components/header/header";
import { Navigation } from "./components/navigation/navigation";
import { Layout } from "./components/layout/layout";
import "./app.css";
import style from "solid-uix/dist/main.css?url";

const ClientOnlyScrollAnchor = clientOnly(() => import("./components/scroll/scroll"));

const App = () => {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solid Hook Form</Title>
          <Meta
            name="description"
            content="Performant, flexible and extensible forms with easy-to-use validation."
          />
          <Meta
            name="keywords"
            content="solid, solid-hook-form, hooks, forms, validation, typescript"
          />
          <Meta property="og:title" content="Solid Hook Form" />
          <Meta property="og:site_name" content="Solid Hook Form" />
          <Meta
            name="og:description"
            content="Performant, flexible and extensible forms with easy-to-use validation."
          />
          <Link rel="stylesheet" href={style} />

          <Layout>
            <Header />
            <Navigation />
            <Suspense>{props.children}</Suspense>
          </Layout>
        </MetaProvider>
      )}
    >
      <FileRoutes />
      <ClientOnlyScrollAnchor />
    </Router>
  );
};

export default App;
