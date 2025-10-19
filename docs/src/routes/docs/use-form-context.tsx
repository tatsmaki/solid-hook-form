import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Link } from "~/components/link/link";

const UseFormContext = () => {
  return (
    <main>
      <Title>useFormContext</Title>
      <Container>
        <h1>useFormContext</h1>

        <p>
          This hook allows you to access the form context. useFormContext is intended to be used in
          deeply nested structures, where it would become inconvenient to pass the form as a prop.
        </p>

        <blockquote>
          <p>
            You need to wrap your form with the <b>FormProvider</b> component for useFormContext to
            work properly.
          </p>
        </blockquote>

        <p>This hook will return all the useForm return methods and props.</p>

        <Code language="js">{`import { useFormContext } from "solid-hook-form";

export const NestedInput = () => {
  const { register } = useFormContext();

  return <input {...register("name")} />;
};`}</Code>

        <div id="form-provider">
          <h2>
            <Link href="#form-provider">FormProvider</Link>
          </h2>

          <p>
            This component will host context object and allow consuming component to subscribe to
            context and use useForm props and methods.
          </p>

          <blockquote>
            <p>Avoid using nested FormProvider</p>
          </blockquote>

          <Code language="js">{`import { useForm, FormProvider } from "solid-hook-form";

export const ExampleForm = () => {
  const form = useForm();

  return (
    <FormProvider form={form}>
      <form>
        <NestedInput />
      </form>
    </FormProvider>
  );
};`}</Code>
        </div>
      </Container>
    </main>
  );
};

export default UseFormContext;
