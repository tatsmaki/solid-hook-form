import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";

const FormContext = () => {
  return (
    <main>
      <Title>useFormContext</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>useFormContext</h1>

          <p>
            This hook allows you to access the form context. useFormContext is intended to be used
            in deeply nested structures, where it would become inconvenient to pass the form as a
            prop.
          </p>

          <p style={{ "margin-bottom": 0 }}>Returns</p>
          <hr />

          <p>This hook will return all the createForm return methods and props.</p>

          <Code language="js">{`import { useFormContext } from "solid-hook-form"

export const NestedInput = () => {
    const { register } = useFormContext()

    return <input {...register("name")} />
}`}</Code>

          <blockquote>
            <p>
              You need to wrap your form with the <b>FormProvider</b> component for useFormContext
              to work properly.
            </p>
          </blockquote>

          <Code language="js">{`import { createForm, FormProvider } from "solid-hook-form"

export const ExampleForm = () => {
    const form = createForm()
    const { handleSubmit } = form

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <FormProvider form={form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <NestedInput />
                <button type="submit">Save</button>
            </form>
        </FormProvider>
    )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default FormContext;
