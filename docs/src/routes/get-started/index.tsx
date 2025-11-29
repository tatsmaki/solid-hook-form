import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Footer } from "~/components/footer/footer";
import { Navigation } from "~/components/navigation/navigation";

const GetStarted = () => {
  return (
    <main>
      <Title>Get started</Title>

      <Container.Grid>
        <Navigation>
          <Link href="/get-started#install" color="secondary">
            Install
          </Link>
          <Link href="/get-started#register-fields" color="secondary">
            Register fields
          </Link>
          <Link href="/get-started#apply-validation" color="secondary">
            Apply validation
          </Link>
          <Link href="/get-started#controller" color="secondary">
            Controlled Inputs
          </Link>
          <Link href="/get-started#handle-errors" color="secondary">
            Handle errors
          </Link>
          <Link href="/get-started#typescript" color="secondary">
            TypeScript
          </Link>
        </Navigation>

        <Container.Content>
          <h1>Get started</h1>

          <div id="install">
            <h2>
              <Link href="#install" color="secondary">
                Install
              </Link>
            </h2>
            <p>Install Solid Hook Form package.</p>
            <Code language="sh">npm install solid-hook-form</Code>
          </div>

          <div id="example">
            <h2>
              <Link href="#example" color="secondary">
                Example
              </Link>
            </h2>
            <p>The following code demonstrates a basic usage example.</p>
            <Code language="js">
              {`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const { register, handleSubmit } = createForm({
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <button type="submit">Save</button>
    </form>
  )
}`}
            </Code>
          </div>

          <div id="register-fields">
            <h2>
              <Link href="#register-fields" color="secondary">
                Register fields
              </Link>
            </h2>
            <p>
              To make field values available for form validation and submission, you need to
              register your input elements with the form using the register function.
            </p>
            <blockquote>
              <p>Form field name should match a registered component name.</p>
            </blockquote>

            <Code language="js">
              {`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const { register, handleSubmit } = createForm({
    defaultValues: {
      name: "",
      email: "",
      agree: false
    }
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="checkbox" {...register("agree")} />
      <button type="submit">Save</button>
    </form>
  )
}`}
            </Code>
          </div>

          <div id="apply-validation">
            <h2>
              <Link href="#apply-validation" color="secondary">
                Apply validation
              </Link>
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

            <p>
              You can read more detail on each rule in the{" "}
              <Link href="/docs/create-form/register" color="accent">
                register section
              </Link>
              .
            </p>

            <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const { register, handleSubmit } = createForm({
    defaultValues: {
      name: "",
      email: "",
      agree: false
    }
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { minLength: 2, pattern: /[A-Za-z]/ })} />
      <input type="email" {...register("email", { maxLength: 254 })} />
      <input type="checkbox" {...register("agree", { required: true })} />
      <button type="submit">Save</button>
    </form>
  )
}`}</Code>
          </div>

          <div id="controller">
            <h2>
              <Link href="#controller" color="secondary">
                Controlled Inputs
              </Link>
            </h2>
            <p>
              This library embraces uncontrolled components and native HTML inputs. However, it's
              hard to avoid working with external controlled components such as{" "}
              <Link href="https://kobalte.dev" target="_blank">
                Kobalte
              </Link>
              . To make this simple, we provide a wrapper component, Controller.
            </p>

            <p>Using Component API</p>

            <Code language="js">{`import { TextField } from "@kobalte/core/text-field"
import { createForm, Controller } from "solid-hook-form"

export const ExampleForm = () => {
  const { control, handleSubmit } = createForm({
    defaultValues: {
      field: ""
    }
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller 
        control={control}
        name="field"
        render={({ field, fieldState }) => (
          <TextField>
            <TextField.Label>Field</TextField.Label>
            <TextField.Input
              {...field}
              value={field.value()}
              validationState={fieldState.error() ? "invalid" : "valid"}
            />
          </TextField>
        )}
        rules={{
          minLength: { value: 5, message: "Min 5" }
        }}
      />
    </form>
  )
}`}</Code>

            <p>Using Hooks API</p>

            <Code language="js">
              {`import { TextField } from "@kobalte/core/text-field"
import { createForm, useController } from "solid-hook-form"

const ControlledInput = (props) => {
  const { field, fieldState } = useController({
    control: props.control,
    name: "firstName",
    rules: { required: true }
  })

  return (
    <TextField>
      <TextField.Label>Field</TextField.Label>
      <TextField.Input
        {...field}
        value={field.value()}
        validationState={fieldState.error() ? "invalid" : "valid"}
      />
    </TextField>
  )
}

export const ExampleForm = () => {
  const { control, handleSubmit } = createForm({
    defaultValues: {
      firstName: ""
    },
    mode: "onChange"
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput control={control} />
      <button type="submit">Save</button>
    </form>
  )
}`}
            </Code>
          </div>

          <div id="handle-errors">
            <h2>
              <Link href="#handle-errors" color="secondary">
                Handle errors
              </Link>
            </h2>
            <p>
              Solid Hook Form provides an errors accessor to show you the errors in the form.
              errors' type will return given validation constraints. The following example showcases
              a required validation rule.
            </p>

            <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const { register, errors, handleSubmit } = createForm({
    defaultValues: {
      name: "",
      email: ""
    }
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: true })}
        aria-invalid={Boolean(errors.name)}
      />
      {errors.name && <p role="alert">Name is required</p>}

      <input
        {...register("email", { required: "Email is required" })}
        aria-invalid={Boolean(errors.email)}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <button type="submit">Save</button>
    </form>
  )
}`}</Code>
          </div>

          <div id="typescript">
            <h2>
              <Link href="#typescript" color="secondary">
                TypeScript
              </Link>
            </h2>
            <p>Solid Hook Form is built with TypeScript, and you can define a FormValues type.</p>

            <Code language="ts">{`import { createForm } from "solid-hook-form"

type ExampleFormValues = {
  name: string;
  email: string;
  agree: boolean;
}

export const ExampleForm = () => {
  const { register, handleSubmit } = createForm<ExampleFormValues>({
    defaultValues: {
      name: "",
      email: "",
      agree: false
    }
  })

  const onSubmit = (values: ExampleFormValues) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="checkbox" {...register("agree")} />
      <button type="submit">Save</button>
    </form>
  )
}`}</Code>
          </div>
        </Container.Content>

        <Footer />
      </Container.Grid>
    </main>
  );
};

export default GetStarted;
