import { HttpStatusCode } from "@solidjs/start";
// import { Button } from "solid-uix";

const NotFound = () => {
  return (
    <main>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>

      {/* <Button>Go home</Button> */}
    </main>
  );
};

export default NotFound;
