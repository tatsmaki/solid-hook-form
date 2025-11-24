import { createForm, FormProvider, Controller } from "./import";
import { Field, TextInput, Checkbox, Button } from "solid-uix";
import { zodResolver } from "@hookform/resolvers/zod";
import { Errors } from "./errors/errors";
import { Values } from "./values/values";
import { formSchema, FormValues } from "./schema";
import sx from "./form.module.css";

export const Form = () => {
  const form = createForm<FormValues>({
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
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });
  const { errors, register, handleSubmit, reset } = form;

  const onSubmit = (values: FormValues) => {
    console.log("onSubmit", values);
  };

  const onReset = () => {
    reset();
  };

  return (
    <div class={sx.demo} id="playground-form">
      <FormProvider form={form}>
        <form class={sx.form} onSubmit={handleSubmit(onSubmit)}>
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
          {/* <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field error={!!fieldState.error()}>
                <Field.Label>Password</Field.Label>
                <TextInput {...field} value={field.value()} />
                <Field.Message level="error">{fieldState.error()?.message}</Field.Message>
              </Field>
            )}
            rules={{
              required: "Required",
              minLength: { value: 8, message: "Min 8" },
            }}
          /> */}

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
                valueAsNumber: true,
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
