# useForm

useForm is a custom hook for managing forms with ease. It takes one object as optional argument. The following example demonstrates all of its properties and methods.

## defaultValues

The defaultValues prop populates the entire form with default values. It is recommended to use defaultValues for the entire form.

```javascript
useForm({
  defaultValues: {
    firstName: "",
    lastName: "",
  },
});
```

## register

This method allows you to register an input or select element and apply validation rules to Solid Hook Form. Validation rules are all based on the HTML standard and also allow for custom validation methods.

```javascript
<input {...register("firstName", { required: true })} />
<input {...register("lastName", { minLength: 5 })} />
```

> NOTE: It is possible to use nested form values

```javascript
useForm({
  defaultValues: {
    user: {
      profile: {
        firstName: "",
      },
    },
  },
});

<input {...register("user.profile.firstName")} />;
```
