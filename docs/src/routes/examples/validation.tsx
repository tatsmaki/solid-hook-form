import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Image } from "~/components/image/image";

const Validation = () => {
  return (
    <main>
      <Title>Validation</Title>
      <Container>
        <h1>Validation</h1>

        <p>
          Check full example at{" "}
          <Link
            href="https://stackblitz.com/edit/solidjs-templates-lf7zsywk?file=src%2Fexample_form%2Fexample_form.tsx"
            target="_blank"
            color="accent"
          >
            StackBlitz
          </Link>
          .
        </p>

        <Image src="/validation.png" />

        <p>
          You can find full list of validation rules in{" "}
          <Link href="/docs/use-form/register#rules" color="accent">
            useForm - register rules
          </Link>{" "}
          docs section.
        </p>

        <p>Register input and apply validation rules:</p>

        <Code language="js">{`import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { errors, register, onSubmit } = form;

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={onSubmit(saveExample)}>
        <input
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^your-email-regex$/,
              message: "Invalid email",
            },
          })}
        />

        <pre>{JSON.stringify(errors(), null, 2)}</pre>

        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};`}</Code>

        <p>Don't forget to display an accessible error message:</p>

        <Code language="js">{`<input
  {...register("email", {
    required: "Required",
    pattern: {
      value: /^your-email-regex$/,
      message: "Invalid email",
    },
  })}
  aria-invalid={Boolean(errors().email)}
/>
{errors().email && <p role="alert">{errors().email.message}</p>}`}</Code>

        <p>
          When using TypeScript, define form values type and apply it to the form for additional
          type safety:
        </p>

        <Code language="ts">{`type ExampleFormValues = {
  email: string;
};

const ExampleForm = () => {
  const form = useForm<ExampleFormValues>({
    defaultValues: {
      email: "",
    },
  });
};`}</Code>
      </Container>
    </main>
  );
};

export default Validation;
