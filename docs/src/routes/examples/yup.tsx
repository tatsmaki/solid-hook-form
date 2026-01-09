import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { ExamplesNavigation } from "~/components/navigation/examples_navigation";

const Yup = () => {
  return (
    <main>
      <Title>Yup</Title>
      <Container.Grid>
        <ExamplesNavigation />

        <Container.Content>
        <h1>Yup</h1>

        <p>
          You can find full example at{" "}
          <Link
            href="https://stackblitz.com/edit/solidjs-templates-mnwtfxjb?file=src%2Fexample_form%2Fexample_schema.ts"
            target="_blank"
            color="accent"
          >
            StackBlitz
          </Link>
          .
        </p>

        <p>
          Check{" "}
          <Link href="https://github.com/jquense/yup" target="_blank" color="accent">
            Yup
          </Link>{" "}
          documentation for more details.
        </p>

        <p>Define a schema:</p>

        <Code language="js">{`import { object, string, boolean } from 'yup'

export const exampleSchema = object({
  email: string().email().required(),
  name: string().required(),
  consent: boolean().isTrue()
})
`}</Code>

        <p>When using TypeScript, infer form values type from the schema:</p>

        <Code language="ts">{`import { InferType } from 'yup'

export type ExampleFormValues = InferType<typeof exampleSchema>`}</Code>

        <p>Connect schema to the form:</p>

        <Code language="js">{`import { createForm } from 'solid-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { exampleSchema } from './example_schema'

export const ExampleForm = () => {
  const form = createForm({
    defaultValues: {
      email: '',
      name: '',
      consent: false
    },
    resolver: yupResolver(exampleSchema)
  })
  const { errors, register, handleSubmit } = form

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} aria-invalid={Boolean(errors.email)} />
      {errors.email && <p role="alert">{errors.email.message}</p>}    

      <input {...register('name')} aria-invalid={Boolean(errors.name)} />
      {errors.name && <p role="alert">{errors.name.message}</p>}

      <input type="checkbox" {...register('consent')} aria-invalid={Boolean(errors.consent)} />
      {errors.consent && <p role="alert">{errors.consent.message}</p>}

      <button type="submit">Save</button>
    </form>
  )
}
`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Yup;
