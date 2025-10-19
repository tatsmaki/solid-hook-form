import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Image } from "~/components/image/image";
import { Link } from "~/components/link/link";

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
            style={{
              color: "var(--colors-accent-500)",
            }}
          >
            StackBlitz
          </Link>
          .
        </p>

        <Image src="/public/validation.png" />

        <Code language="ts">{`import { useForm } from "solid-hook-form";

type ExampleFormValues = {
  email: string;
};

export const ExampleForm = () => {
  const form = useForm<ExampleFormValues>({
    defaultValues: {
      email: "",
    },
  });
  const { errors, register, onSubmit } = form;

  const saveExample = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={onSubmit(saveExample)}>
        <input
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          aria-invalid={Boolean(errors().email)}
        />
        {errors().email && <p role="alert">{errors().email.message}</p>}

        <pre>{JSON.stringify(errors(), null, 2)}</pre>
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};`}</Code>
      </Container>
    </main>
  );
};

export default Validation;
