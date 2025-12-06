import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const SetValue = () => {
  return (
    <main>
      <Title>setValue - createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>setValue</h1>

          <p>
            This function allows you to dynamically set the value of a registered field and have the
            options to validate and update the form state.
          </p>

          <pre
            style={{ color: "var(--colors-accent-500)", "white-space": "break-spaces" }}
          >{`(name: string, value: any, options?: SetValueOptions) => void`}</pre>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <Table>
            {[
              ["Name", "Type", "Description"],
              ["name", "string", "Form field name."],
              [
                "value",
                "any",
                "The value for the field. This argument is required and can not be undefined."
              ],
              [
                "options.shouldValidate",
                "boolean",
                "This option will trigger validation for the target field."
              ],
              [
                "options.shouldDirty",
                "boolean",
                "This option will update dirtyFields at the specified field level."
              ],
              [
                "options.shouldTouch",
                "boolean",
                "This option will update touchedFields at the specified field level."
              ]
            ]}
          </Table>

          <Code language="js">{`import { createForm } from "solid-hook-form"

const ExampleForm = () => {
  const { register, setValue } = createForm({
    defaultValues: {
      firstName: ""
    }
  })

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <button
        onClick={() => {
          setValue("firstName", "Bill")
        }}
      >
        setValue
      </button>
      <button
        onClick={() => {
          setValue("firstName", "Luo", {
            shouldValidate: true,
            shouldDirty: true,
          })
        }}
      >
        setValue options
      </button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default SetValue;
