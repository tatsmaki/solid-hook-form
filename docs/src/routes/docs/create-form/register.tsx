import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const Register = () => {
  return (
    <main>
      <Title>register - createForm</Title>

      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>register</h1>
          <p>
            This method allows you to register an input or select element and apply validation rules
            to Solid Hook Form. Validation rules are all based on the HTML standard and also allow
            for custom validation methods.
          </p>

          <pre style={{ color: "var(--colors-accent-500)", "white-space": "break-spaces" }}>
            {`(name: string, options?: Rules) => ({ ref, name, onInput, onChange, onBlur })`}
          </pre>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />
          <Table>
            {[
              ["Name", "Type", "Description"],
              ["name", "string", "Input's name."],
              ["options", "Rules", "Input's behavior."],
            ]}
          </Table>

          <Code language="js">{`const { register } = createForm({
  defaultValues: {
    firstName: "",
    lastName: ""
  }
})

return (
  <form>
    <input {...register("firstName", { required: true })} />
    <input {...register("lastName", { minLength: 5 })} />
  </form>
)`}</Code>

          <p style={{ "margin-bottom": 0 }}>Returns</p>
          <hr />
          <Table>
            {[
              ["Name", "Type", "Description"],
              ["name", "string", "Input's name being registered."],
              ["ref", "Function", "Element ref used to connect form to the input."],
              ["onInput", "Function", "onInput prop to subscribe the input change"],
              ["onChange", "Function", "onChange prop to subscribe the input change"],
              ["onBlur", "Function", "onBlur prop to subscribe the input blur"],
            ]}
          </Table>

          <blockquote>
            <p>It is possible to use nested form values:</p>
          </blockquote>

          <Code language="js">{`const { register } = createForm({
  defaultValues: {
    user: {
      profile: {
        firstName: ""
      }
    }
  }
})

return (
  <form>
    <input {...register("user.profile.firstName")} />
  </form>
)`}</Code>

          <div id="rules">
            <h2>
              <Link href="#rules" color="secondary">
                Rules
              </Link>
            </h2>

            <p>Options to describe registered input's behavior.</p>
            <Table>
              {[
                ["Name", "Type", "Description"],
                [
                  "required",
                  "boolean",
                  "Indicates that the input must have a value before the form can be submitted.",
                ],
                [
                  "maxLength",
                  "number",
                  "The maximum length of the value to accept for this input.",
                ],
                [
                  "minLength",
                  "number",
                  "The minimum length of the value to accept for this input.",
                ],
                ["max", "number", "The maximum value to accept for this input."],
                ["min", "number", "The minimum value to accept for this input."],
                ["pattern", "RegExp", "The regex pattern for the input."],
                [
                  "validate",
                  "Function",
                  "Validate function will be executed on its own without depending on other validation rules included in the required attribute.",
                ],
                [
                  "valueAsNumber",
                  "boolean",
                  "Returns Number normally. If something goes wrong NaN will be returned.",
                ],
              ]}
            </Table>

            <p>Provide both validation rule and error message:</p>

            <Code language="js">{`const { register } = createForm({
  defaultValues: {
    firstName: "",
    lastName: ""
  }
})

return (
  <form>
    <input
      {...register("firstName", {
        required: "First name is required"
      })}
    />
    <input
      {...register("lastName", {
        minLength: { value: 5, message: "Min 5 characters" }
      })}
    />
  </form>
)`}</Code>
          </div>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Register;
