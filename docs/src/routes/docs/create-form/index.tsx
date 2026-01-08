import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const UseForm = () => {
  return (
    <main>
      <Title>createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>createForm</h1>

          <p>
            createForm is a function used to create a form instance. It takes one object as a{" "}
            <b>required</b>
            argument. The following example demonstrates all of its properties and methods.
          </p>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <Table>
            {[
              ["Name", "Type", "Description"],
              ["defaultValues", "Object", "Default values for the form."],
              ["mode", "string", "Validation strategy. Defaults to 'onChange'."],
              ["resolver", "Resolver", "Integrates with your preferred schema validation library."],
              ["shouldFocusError", "boolean", "Enable or disable built-in focus management."]
            ]}
          </Table>

          <div id="default-values">
            <h2>
              <Link href="#default-values" color="secondary">
                defaultValues
              </Link>
            </h2>

            <p>
              The defaultValues prop populates the entire form with default values. You must provide{" "}
              <b>defaultValues</b> for all form fields to ensure type safety and proper form
              initialization.
            </p>

            <Code language="js">
              {`createForm({
  defaultValues: {
    firstName: "",
    lastName: ""
  }
})`}
            </Code>
          </div>

          <div id="mode">
            <h2>
              <Link href="#mode" color="secondary">
                mode
              </Link>
            </h2>

            <p>
              This option allows you to configure the validation strategy before a user submits the
              form. The validation occurs during the onSubmit event, which is triggered by invoking
              the handleSubmit function.
            </p>

            <Table>
              {[
                ["Name", "Type", "Description"],
                ["onSubmit", "string", "Validation is triggered on the submit event."],
                ["onBlur", "string", "Validation is triggered on the blur event."],
                [
                  "onChange",
                  "string",
                  "Validation is triggered on the change event for each input, leading to multiple re-renders."
                ],
                [
                  "onTouched",
                  "string",
                  "Validation is initially triggered on the first blur event. After that, it is triggered on every change event."
                ]
              ]}
            </Table>

            <Code language="js">
              {`createForm({
  mode: 'onChange'
})`}
            </Code>
          </div>

          <div id="resolver">
            <h2>
              <Link href="#resolver" color="secondary">
                resolver
              </Link>
            </h2>

            <p>
              This function allows you to use any external validation library such as{" "}
              <Link href="https://github.com/jquense/yup" target="_blank" color="accent">
                Yup
              </Link>
              ,{" "}
              <Link href="https://github.com/colinhacks/zod" target="_blank" color="accent">
                Zod
              </Link>{" "}
              and many others. The goal is to make sure you can seamlessly integrate whichever
              validation library you prefer. If you're not using a library, you can always write
              your own logic to validate your forms.
            </p>

            <p>
              Install{" "}
              <Link
                href="https://github.com/react-hook-form/resolvers"
                target="_blank"
                color="accent"
              >
                @hookform/resolvers
              </Link>{" "}
              package
            </p>

            <Code language="sh">{`npm install @hookform/resolvers`}</Code>

            <p>Define a schema:</p>

            <Code language="ts">
              {`import z, { object, string, number } from "zod"

const formSchema = object({
  name: string().min(1, "Required"),
  age: number()
})

type FormValues = z.infer<typeof formSchema>
`}
            </Code>

            <p>Apply resolver:</p>

            <Code language="ts">
              {`import { zodResolver } from '@hookform/resolvers'
import { createForm } from 'solid-hook-form'

const ExampleForm = () => {
  const { register, handleSubmit } = createForm<FormValues>({
    defaultValues: {
      name: '',
      age: 0
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: FormValues) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />
        <input type="number" {...register('age', { valueAsNumber: true })} />
        <button type="submit">Save</button>
    </form>
  )
}`}
            </Code>
          </div>

          <div id="shouldFocusError">
            <h2>
              <Link href="#shouldFocusError" color="secondary">
                shouldFocusError
              </Link>
            </h2>

            <p>
              When set to true (default), and the user submits a form that fails validation, focus
              is set on the first field with an error.
              <br />
              The focus order is based on the register order.
            </p>

            <Code language="js">
              {`createForm({
  defaultValues: {
    firstName: "",
    lastName: ""
  },
  shouldFocusError: false
})`}
            </Code>
          </div>

          <p style={{ "margin-bottom": 0 }}>Returns</p>
          <hr />

          <p>The following list contains reference to createForm return props.</p>

          <ul>
            <li>
              <Link href="/docs/create-form/register" color="accent">
                register
              </Link>
            </li>
            <li>
              <Link href="/docs/create-form/form-state" color="accent">
                formState
              </Link>
            </li>
            <li>values</li>
            <li>errors</li>
            <li>
              <Link href="/docs/create-form/submit" color="accent">
                handleSubmit
              </Link>
            </li>
            <li>
              <Link href="/docs/create-form/reset" color="accent">
                reset
              </Link>
            </li>
            <li>
              <Link href="/docs/create-form/set-error" color="accent">
                setError
              </Link>
            </li>
            <li>
              <Link href="/docs/create-form/clear-errors" color="accent">
                clearErrors
              </Link>
            </li>
            <li>
              <Link href="/docs/create-form/set-value" color="accent">
                setValue
              </Link>
            </li>
            <li>getValues</li>
            <li>
              <Link href="/docs/create-form/trigger" color="accent">
                trigger
              </Link>
            </li>
          </ul>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default UseForm;
