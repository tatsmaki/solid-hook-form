import { FormProvider } from "../src/form_provider";
import { useForm } from "../src/use_form";
import { Errors } from "./errors/errors";
import { Values } from "./values/values";
import { Field, TextInput, Checkbox, Button } from "solid-uix";
import "solid-uix/dist/main.css";
import sx from "./form.module.css";

export type DemoFormValues = {
  date: string;
  email: string;
  password: string;
  profile: {
    age: number;
    name: string;
  };
  remember: boolean;
};

export const Form = () => {
  const form = useForm<DemoFormValues>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      email: "",
      password: "",
      profile: {
        age: 0,
        name: "",
      },
      remember: false,
    },
    mode: "onInput",
  });
  const { errors, register, onSubmit, reset } = form;

  const onSave = (values: DemoFormValues) => {
    console.log(values);
  };

  const onReset = () => {
    reset();
  };

  return (
    <div class={sx.demo}>
      <FormProvider form={form}>
        <form class={sx.form} onSubmit={onSubmit(onSave)}>
          <h2>Form</h2>

          <Field error={!!errors().date}>
            <Field.Label>Date</Field.Label>
            <TextInput type="date" {...register("date", { required: "Required" })} />
            <Field.Message level="error">{errors().date?.message}</Field.Message>
          </Field>

          <Field error={!!errors().email}>
            <Field.Label>Email</Field.Label>
            <TextInput
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            <Field.Message level="error">{errors().email?.message}</Field.Message>
          </Field>

          <Field error={!!errors().password}>
            <Field.Label>Password</Field.Label>
            <TextInput
              {...register("password", {
                required: "Required",
                minLength: { value: 8, message: "Min 8" },
              })}
            />
            <Field.Message level="error">{errors().password?.message}</Field.Message>
          </Field>

          <Field error={!!errors()["profile.name"]}>
            <Field.Label>Name</Field.Label>
            <TextInput
              {...register("profile.name", {
                required: "Required",
                maxLength: { value: 10, message: "Max 10" },
              })}
            />
            <Field.Message level="error">{errors()["profile.name"]?.message}</Field.Message>
          </Field>

          <Field error={!!errors()["profile.age"]}>
            <Field.Label>Age</Field.Label>
            <TextInput
              type="number"
              {...register("profile.age", {
                min: {
                  value: 18,
                  message: "Min 18",
                },
                max: {
                  value: 100,
                  message: "Max 100",
                },
              })}
            />
            <Field.Message level="error">{errors()["profile.age"]?.message}</Field.Message>
          </Field>

          <Field error={!!errors().remember}>
            <Checkbox
              label="Remember me"
              {...register("remember", { required: "Required" })}
              error={!!errors().remember}
            />
            <Field.Message level="error">{errors().remember?.message}</Field.Message>
          </Field>

          {/* <Field>
            <Field.Label>Title</Field.Label>
            <select {...register("title", { required: "Required" })}>
              <option value="">Select...</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
            </select>
            <Field.Message level="error">{errors().title?.message}</Field.Message>
          </Field> */}

          <Button type="submit">Submit</Button>
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
        </form>

        <Values />

        <Errors />
      </FormProvider>
    </div>
  );
};
