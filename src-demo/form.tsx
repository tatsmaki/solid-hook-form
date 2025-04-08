import { FormProvider } from "../src/form_provider";
import { useForm } from "../src/use_form";
import { Checkbox } from "./checkbox/checkbox";
import { Errors } from "./errors/errors";
import sx from "./form.module.css";
import { Input } from "./input/input";
import { Select } from "./select/select";
import { Values } from "./values/values";

export type DemoFormValues = {
  date: string;
  email: string;
  password: string;
  age: number;
  remember: boolean;
  title: string;
};

export const Form = () => {
  const form = useForm<DemoFormValues>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      email: "",
      password: "",
      age: 0,
      remember: false,
      title: "",
    },
    mode: "onInput",
  });
  const { errors, register, onSubmit } = form;

  const onSave = (values: DemoFormValues) => {
    console.log(values);
  };

  return (
    <div class={sx.demo}>
      <FormProvider form={form}>
        <form class={sx.form} onSubmit={onSubmit(onSave)}>
          <h2>Form</h2>

          <Input
            label="Date"
            type="date"
            {...register("date", { required: "Required" })}
            error={errors().date}
          />

          <Input
            label="Email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            error={errors().email}
          />

          <Input
            label="Password"
            {...register("password", {
              required: "Required",
              minLength: { value: 8, message: "Min 8" },
            })}
            error={errors().password}
          />

          <Input
            label="Age"
            type="number"
            {...register("age", {
              min: {
                value: 18,
                message: "Min 18",
              },
              max: {
                value: 100,
                message: "Max 100",
              },
            })}
            error={errors().age}
          />

          <Checkbox
            label="Remember me"
            {...register("remember", { required: "Required" })}
            error={errors().remember}
          />

          <Select
            label="Title"
            {...register("title", { required: "Required" })}
            error={errors().title}
          >
            <option value="">Select...</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </Select>

          <button type="submit">Submit</button>
        </form>

        <Values />

        <Errors />
      </FormProvider>
    </div>
  );
};
