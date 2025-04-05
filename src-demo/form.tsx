import { useForm } from "../src/use_form";
import { Checkbox } from "./checkbox/checkbox";
import sx from "./form.module.css";
import { Input } from "./input/input";

type FormValues = {
  date: string;
  email: string;
  password: string;
  age: number;
  remember: boolean;
};

export const Form = () => {
  const { values, errors, register, onSubmit } = useForm<FormValues>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      email: "",
      password: "",
      age: 0,
      remember: false,
    },
  });

  const onSave = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div class={sx.demo}>
      <form class={sx.form} onSubmit={onSubmit(onSave)}>
        <h2>Form</h2>

        <Input label="Date" type="date" {...register("date", { required: "Required" })} />

        <Input
          label="Email"
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
        />

        <Input
          label="Password"
          {...register("password", {
            required: "Required",
            minLength: { value: 8, message: "Min 8" },
          })}
        />

        <Input label="Age" type="number" {...register("age", { min: 18, max: 100 })} />

        <Checkbox label="Remember me" {...register("remember", { required: "Required" })} />

        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Watch</h2>
        <pre>{JSON.stringify(values(), null, 2)}</pre>
      </div>

      <div>
        <h2>Errors</h2>
        <pre>{JSON.stringify(errors(), null, 2)}</pre>
      </div>
    </div>
  );
};
