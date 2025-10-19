import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Link } from "~/components/link/link";

const GetStarted = () => {
  return (
    <main>
      <Container>
        <h1>Get started</h1>

        <div id="install">
          <h2>
            <Link href="#install">Install</Link>
          </h2>
          <p>Install Solid Hook Form package.</p>
          <Code language="sh">npm install solid-hook-form</Code>
        </div>

        <div id="example">
          <h2>
            <Link href="#example">Example</Link>
          </h2>
          <p>The following code demonstrates a basic usage example.</p>
          <Code language="js">
            {`import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const { register, onSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name")} />
      <button type="submit">Save</button>
    </form>
  );
};`}
          </Code>
        </div>

        <div id="register-fields">
          <h2>
            <Link href="#register-fields">Register fields</Link>
          </h2>
          <p>
            To make field value available for form validation and submission you need to register
            your component into the hook.
          </p>
          <blockquote>
            <p>Note: form field name should match a registered component name.</p>
          </blockquote>

          <Code language="js">
            {`import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const { register, onSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      agree: false,
    },
  });

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="checkbox" {...register("agree")}>
      <button type="submit">Save</button>
    </form>
  );
};`}
          </Code>
        </div>

        <div id="apply-validation">
          <h2>
            <Link href="#apply-validation">Apply validation</Link>
          </h2>
          <p>
            Solid Hook Form makes form validation easy by aligning with the existing HTML standard
            for form validation.
          </p>

          <p>List of validation rules supported:</p>

          <ul>
            <li>required</li>
            <li>min</li>
            <li>max</li>
            <li>minLength</li>
            <li>maxLength</li>
            <li>pattern</li>
            <li>validate</li>
          </ul>

          <Code language="js">{`import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const { register, onSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      agree: false,
    },
  });

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name", { minLength: 2, pattern: /[A-Za-z]/ })} />
      <input type="email" {...register("email", { maxLength: 254 })} />
      <input type="checkbox" {...register("agree", { required: true })}>
      <button type="submit">Save</button>
    </form>
  );
};`}</Code>
        </div>

        <div id="typescript">
          <h2>
            <Link href="#typescript">TypeScript</Link>
          </h2>
          <p>Solid Hook Form is built with TypeScript, and you can define a FormValues type.</p>

          <Code language="ts">{`import { useForm } from "solid-hook-form";

type ExampleFormValues = {
  name: string;
  email: string;
  agree: boolean
};

export const ExampleForm = () => {
  const { register, onSubmit } = useForm<ExampleFormValues>({
    defaultValues: {
      name: "",
      email: "",
      agree: false,
    },
  });

  const saveExample = (values: ExampleFormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="checkbox" {...register("agree")}>
      <button type="submit">Save</button>
    </form>
  );
};`}</Code>
        </div>

        <div id="handle-errors">
          <h2>
            <Link href="#handle-errors">Handle errors</Link>
          </h2>
          <p>
            Solid Hook Form provides an errors accessor to show you the errors in the form. errors'
            type will return given validation constraints. The following example showcases a
            required validation rule.
          </p>

          <Code language="js">{`import { useForm } from "solid-hook-form";

export const ExampleForm = () => {
  const { register, errors, onSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const saveExample = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(saveExample)}>
      <input {...register("name", { required: true })} aria-invalid={Boolean(errors().name)} />
      {errors().name && <p role="alert">Name is required</p>}

      <input
        {...register("email", { required: "Email is required" })}
        aria-invalid={Boolean(errors().email)}
      />
      {errors().email && <p role="alert">{errors().email.message}</p>}

      <button type="submit">Save</button>
    </form>
  );
};`}</Code>
        </div>
      </Container>
    </main>
  );
};

export default GetStarted;
