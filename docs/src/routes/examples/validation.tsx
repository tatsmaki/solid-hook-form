/** biome-ignore-all lint/suspicious/noUselessEscapeInString: regex escape */

import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { ExamplesNavigation } from "~/components/navigation/examples_navigation";

const Validation = () => {
  return (
    <main>
      <Title>Validation</Title>
      <Container.Grid>
        <ExamplesNavigation />

        <Container.Content>
        <h1>Validation</h1>

        <p>
          You can find full example at{" "}
          <Link
            href="https://stackblitz.com/edit/solidjs-templates-lf7zsywk?file=src%2Fexample_form%2Fexample_form.tsx"
            target="_blank"
            color="accent"
          >
            StackBlitz
          </Link>
          .
        </p>

        <p>
          You can find full list of validation rules in{" "}
          <Link href="/docs/create-form/register#rules" color="accent">
            createForm - register rules
          </Link>{" "}
          section.
        </p>

        <p>Register input and apply validation rules:</p>

        <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const form = createForm({
    defaultValues: {
      email: ""
    }
  })
  const { errors, register, handleSubmit } = form

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <FormProvider form={form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,  // your email regex
              message: "Invalid email"
            }
          })}
        />

        <pre>{JSON.stringify(errors, null, 2)}</pre>

        <button type="submit">Save</button>
      </form>
    </FormProvider>
  )
}`}</Code>

        <p>Don't forget to display an accessible error message:</p>

        <Code language="js">{`<input
  {...register("email", {
    required: "Required",
    pattern: {
      value: /^[^@]+@[^@]+\.[^@]+$/, // your email regex
      message: "Invalid email"
    }
  })}
  aria-invalid={Boolean(errors.email)}
/>
{errors.email && <p role="alert">{errors.email.message}</p>}`}</Code>

        <p>
          When using TypeScript, define form values type and apply it to the form for additional
          type safety:
        </p>

        <Code language="ts">{`type ExampleFormValues = {
  email: string;
}

const ExampleForm = () => {
  const form = createForm<ExampleFormValues>({
    defaultValues: {
      email: ""
    }
  })
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Validation;
