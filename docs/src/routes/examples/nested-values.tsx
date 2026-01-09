import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Image } from "~/components/image/image";
import { ExamplesNavigation } from "~/components/navigation/examples_navigation";

const NestedValues = () => {
  return (
    <main>
      <Title>Nested Values</Title>
      <Container.Grid>
        <ExamplesNavigation />

        <Container.Content>
          <h1>Nested Values</h1>

        <p>
          Check full example at{" "}
          <Link
            href="https://stackblitz.com/edit/solidjs-templates-kxtctw2h?file=src%2Fexample_form%2Fexample_form.tsx"
            target="_blank"
            color="accent"
          >
            StackBlitz
          </Link>
          .
        </p>

        <Image src="/nested_values.png" />

        <Code language="ts">{`import { createForm } from "solid-hook-form";

type ExampleFormValues = {
  user: {
    email: string;
    profile: {
      name: string;
    };
  };
};

export const ExampleForm = () => {
  const form = createForm<ExampleFormValues>({
    defaultValues: {
      user: {
        email: "",
        profile: {
          name: "",
        },
      },
    },
  });
  const { values, register, handleSubmit } = form;

  const onSubmit = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("user.email")} />
        <input {...register("user.profile.name")} />

        <pre>{JSON.stringify(values(), null, 2)}</pre>
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default NestedValues;
