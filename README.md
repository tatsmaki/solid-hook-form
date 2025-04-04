# solid-hook-form

```tsx
import { useForm } from "solid-hook-form";

const { errors, isValid, register } = useForm({
  defaultValues: {
    email: "",
  },
});

register("email", { required: true });
```
