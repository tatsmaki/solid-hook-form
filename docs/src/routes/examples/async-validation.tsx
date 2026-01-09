/** biome-ignore-all lint/suspicious/noUselessEscapeInString: regex escape */

import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { ExamplesNavigation } from "~/components/navigation/examples_navigation";

const AsyncValidation = () => {
  return (
    <main>
      <Title>Async Validation</Title>
      <Container.Grid>
        <ExamplesNavigation />

        <Container.Content>
          <h1>Async Validation</h1>

          <p>
            You can find full example at{" "}
            <Link
              href="https://stackblitz.com/edit/solidjs-templates-hrzxfhbq?file=src%2Fexample_form%2Fexample_form.tsx"
              target="_blank"
              color="accent"
            >
              StackBlitz
            </Link>
            .
          </p>

          <p>Set validation error manually after server response:</p>

          <Code language="js">{`import { createForm } from 'solid-hook-form'
import { createSignal } from 'solid-js'

export const ExampleForm = () => {
  const form = createForm({
    defaultValues: {
      email: ''
    },
    mode: 'onChange'
  })
  const {
    errors,
    register,
    handleSubmit,
    setError
  } = form

  const [isLoading, setIsLoading] = createSignal(false)

  const onSubmit = (values: ExampleFormValues) => {
    setIsLoading(true)

    fetch('/api/validation')
      .then(response => {
        if (response.status !== 200) {
          setError('email', {
            type: 'custom',
            message: 'This email is already in use'
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register('email', { required: 'Required' })} />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      {isLoading() && <p>Loading...</p>}

      <Button type="submit" disabled={isLoading()}>
        Save
      </Button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default AsyncValidation;
