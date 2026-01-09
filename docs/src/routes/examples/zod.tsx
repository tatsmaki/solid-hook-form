import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { ExamplesNavigation } from "~/components/navigation/examples_navigation";
import { StackBlitzPreview } from "~/components/stackblitz-preview/stackblitz-preview";

const stackblitzUrl =
  "https://stackblitz.com/edit/solidjs-templates-fpxsx83t?file=src%2Fexample_form%2Fexample_schema.ts";

const Zod = () => {
  return (
    <main>
      <Title>Zod</Title>
      <Container.Grid>
        <ExamplesNavigation />

        <Container.Content>
          <h1>Zod</h1>
          <p>Integrate Zod schema validation into your form.</p>

          <p>
            You can find full example at{" "}
            <Link href={stackblitzUrl} target="_blank" color="accent">
              StackBlitz
            </Link>
            .
          </p>

          <StackBlitzPreview src={stackblitzUrl} title="StackBlitz - Zod" />

          <p>
            Check{" "}
            <Link href="https://zod.dev" target="_blank" color="accent">
              Zod
            </Link>{" "}
            documentation for more details.
          </p>

          <p>Define a schema:</p>

          <Code language="js">{`import z, { object, email, string, boolean } from 'zod'

export const exampleSchema = object({
  email: email(),
  name: string().min(1, 'Required'),
  consent: boolean(),
}).superRefine((values, ctx) => {
  if (!values.consent) {
    ctx.addIssue({
      code: 'custom',
      path: ['consent'],
      message: 'Please agree'
    })
  }
})
`}</Code>

          <p>When using TypeScript, infer form values type from the schema:</p>

          <Code language="ts">{`export type ExampleFormValues = z.infer<typeof exampleSchema>`}</Code>

          <p>Connect schema to the form:</p>

          <Code language="js">{`import { createForm } from 'solid-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { exampleSchema } from './example_schema'

export const ExampleForm = () => {
  const form = createForm({
    defaultValues: {
      email: '',
      name: '',
      consent: false
    },
    resolver: zodResolver(exampleSchema)
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

export default Zod;
