import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Link } from "~/components/link/link";

const UseForm = () => {
  return (
    <main>
      <Title>useForm</Title>
      <Container>
        <h1>useForm</h1>

        <p>
          useForm is a custom hook for managing forms with ease. It takes one object as optional
          argument. The following example demonstrates all of its properties and methods.
        </p>

        <div id="default-values">
          <h2>
            <Link href="#default-values">defaultValues</Link>
          </h2>

          <p>
            The defaultValues prop populates the entire form with default values. It is recommended
            to use defaultValues for the entire form.
          </p>

          <Code language="js">
            {`useForm({
  defaultValues: {
    firstName: "",
    lastName: "",
  },
});`}
          </Code>
        </div>

        <div id="register">
          <h2>
            <Link href="#register">register</Link>
          </h2>

          <p>
            This method allows you to register an input or select element and apply validation rules
            to Solid Hook Form. Validation rules are all based on the HTML standard and also allow
            for custom validation methods.
          </p>

          <Code language="js">{`<input {...register("firstName", { required: true })} />
<input {...register("lastName", { minLength: 5 })} />`}</Code>

          <blockquote>
            <p>
              It is possible to use nested form values. See full example{" "}
              <Link href="/examples/nested-values" style={{ color: "var(--colors-accent-500)" }}>
                here
              </Link>
            </p>
          </blockquote>

          <Code language="js">{`useForm({
  defaultValues: {
    user: {
      profile: {
        firstName: "",
      },
    },
  },
});

<input {...register("user.profile.firstName")} />;`}</Code>
        </div>
      </Container>
    </main>
  );
};

export default UseForm;
