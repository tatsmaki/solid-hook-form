import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { Table } from "~/components/table/table";

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

        <p style={{ "margin-bottom": 0 }}>Props</p>
        <hr />

        <Table>
          {[
            ["Name", "Type", "Description"],
            ["defaultValue", "Object", "Default values for the form."],
            ["mode", "string", "Validation strategy."],
            ["resolver", "Resolver", "Integrates with your preferred schema validation library."],
          ]}
        </Table>

        <div id="default-values">
          <h2>
            <Link href="#default-values" color="secondary">
              defaultValues
            </Link>
          </h2>

          <p>
            The defaultValues prop populates the entire form with default values. It is recommended
            to use defaultValues for the entire form.
          </p>

          <Code language="js">
            {`useForm({
  defaultValues: {
    firstName: "",
    lastName: ""
  }
});`}
          </Code>
        </div>

        <div id="mode">
          <h2>
            <Link href="#mode">mode</Link>
          </h2>

          <p>This option allows you to configure the validation strategy.</p>

          <Table>
            {[
              ["Name", "Type", "Description"],
              ["onSubmit", "string", "Validation is triggered on the submit event."],
              [
                "onChange",
                "string",
                "Validation is triggered on the change event for each input. Only updated fields will be re-rendered.",
              ],
            ]}
          </Table>

          <Code language="js">
            {`useForm({
  mode: 'onChange'
});`}
          </Code>
        </div>

        <div id="resolver">
          <h2>
            <Link href="#resolver">resolver</Link>
          </h2>

          <p>
            This function allows you to use any external validation library such as{" "}
            <Link href="https://github.com/jquense/yup" target="_blank" color="accent">
              Yup
            </Link>
            ,{" "}
            <Link href="https://github.com/colinhacks/zod" target="_blank" color="accent">
              Zod
            </Link>{" "}
            and many others. The goal is to make sure you can seamlessly integrate whichever
            validation library you prefer. If you're not using a library, you can always write your
            own logic to validate your forms.
          </p>

          <p>
            Install{" "}
            <Link
              href="https://github.com/react-hook-form/resolvers"
              target="_blank"
              color="accent"
            >
              @hookform/resolvers
            </Link>{" "}
            package
          </p>

          <Code language="sh">{`npm install @hookform/resolvers`}</Code>

          <p>Define a schema:</p>

          <Code language="ts">
            {`import z, { object, string, number } from "zod";

const formSchema = object({
  name: string().min(1, "Required"),
  age: number()
});

type FormValues = z.infer<typeof formSchema>;
`}
          </Code>

          <p>Apply resolver:</p>

          <Code language="ts">
            {`import { zodResolver } from '@hookform/resolvers';

const ExampleForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      age: 0
    },
    resolver: 'zodResolver(schema)'
  });
  const { register, onSubmit } = form;

  const onSave = (values: FormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit(onSave)}>
        <input {...register('name')} />
        <input type="number" {...register('age', { valueAsNumber: true })} />
        <button type="submit">Save</button>
    </form>      
  );
};`}
          </Code>
        </div>

        <p style={{ "margin-bottom": 0 }}>Returns</p>
        <hr />

        <p>The following list contains reference to useForm return props.</p>

        <ul>
          <li>
            <Link href="/docs/use-form/register" color="accent">
              register
            </Link>
          </li>
          <li>
            <Link href="/docs/use-form/submit" color="accent">
              onSubmit
            </Link>
          </li>
          <li>values</li>
          <li>errors</li>
          <li>isValid</li>
          <li>getValues</li>
          <li>setValue</li>
          <li>reset</li>
        </ul>
      </Container>
    </main>
  );
};

export default UseForm;
