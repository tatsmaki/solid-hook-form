import { HttpStatusCode } from "@solidjs/start";
import { Button, buttonSx, cls, Link } from "solid-uix";
import { Container } from "~/components/container/container";

const NotFound = () => {
  return (
    <main>
      <HttpStatusCode code={404} />

      <Container>
        <h1 style={{ "text-align": "center", "margin-top": "20vh" }}>Page Not Found</h1>
      </Container>
    </main>
  );
};

export default NotFound;
