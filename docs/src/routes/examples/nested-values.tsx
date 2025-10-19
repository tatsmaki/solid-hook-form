import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Image } from "~/components/image/image";
import { Link } from "~/components/link/link";

const NestedValues = () => {
  return (
    <main>
      <Container>
        <h1>Nested Values</h1>

        <p>
          Check full example at{" "}
          <Link
            href="https://stackblitz.com/edit/solidjs-templates-kxtctw2h?file=src%2Fexample_form%2Fexample_form.tsx"
            target="_blank"
            style={{
              color: "var(--colors-accent-500)",
            }}
          >
            StackBlitz
          </Link>
          .
        </p>

        <Image src="/public/nested_values.png" />

        <Code language="ts">{`import { useForm } from "solid-hook-form";

type ExampleFormValues = {
  user: {
    email: string;
    profile: {
      name: string;
    };
  };
};

export const ExampleForm = () => {
  const form = useForm<ExampleFormValues>({
    defaultValues: {
      user: {
        email: "",
        profile: {
          name: "",
        },
      },
    },
  });
  const { values, register, onSubmit } = form;

  const saveExample = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={onSubmit(saveExample)}>
        <input {...register("user.email")} />
        <input {...register("user.profile.name")} />

        <pre>{JSON.stringify(values(), null, 2)}</pre>
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};`}</Code>
      </Container>
    </main>
  );
};

export default NestedValues;
