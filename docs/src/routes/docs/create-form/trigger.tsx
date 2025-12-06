import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const Trigger = () => {
  return (
    <main>
      <Title>trigger - createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>trigger</h1>

          <p>
            Manually triggers form or input validation. This method is also useful when you have
            dependant validation (input validation depends on another input's value).
          </p>

          <pre
            style={{ color: "var(--colors-accent-500)", "white-space": "break-spaces" }}
          >{`(name: string | string[]) => void`}</pre>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <Table>
            {[
              ["Name", "Type", "Description", "Example"],
              ["name", "undefined", "Triggers validation on all fields.", "trigger()"],
              [
                "",
                "string",
                "Triggers validation on a specific field value by name.",
                'trigger("email")'
              ],
              [
                "",
                "string[]",
                "Triggers validation on multiple fields by name.",
                'trigger("email", "password")'
              ]
            ]}
          </Table>

          <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const { errors, register, trigger } = createForm({
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  })

  return (
    <form>
      <input
        {...register("firstName", { required: true })}
        aria-invalid={!!errors.firstName}
      />
      <input
        {...register("lastName", { required: true })}
        aria-invalid={!!errors.lastName}
      />
      <button
        type="button"
        onClick={() =>  trigger()}
      >
        Trigger Form
      </button>
      <button
        type="button"
        onClick={() => trigger("lastName")}
      >
        Trigger Single Field
      </button>
      <button
        type="button"
        onClick={() => trigger(["firstName", "lastName"])}
      >
        Trigger Multiple Fields
      </button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Trigger;
