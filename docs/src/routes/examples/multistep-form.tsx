import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { ExamplesNavigation } from "~/components/navigation/examples_navigation";
import { StackBlitzPreview } from "~/components/stackblitz-preview/stackblitz-preview";

const stackblitzUrl =
  "https://stackblitz.com/edit/solidjs-templates-gjnvz92x?file=src%2Fmultistep_form%2Fstep1.tsx";

const MultistepForm = () => {
  return (
    <main>
      <Title> Multi-Step Form</Title>
      <Container.Grid>
        <ExamplesNavigation />
        <Container.Content>
          <h1>Multi-Step Form</h1>

          <p>Collect user information through different pages and sections.</p>

          <p>
            Check full example at{" "}
            <Link href={stackblitzUrl} target="_blank" color="accent">
              StackBlitz
            </Link>
            .
          </p>

          <StackBlitzPreview
            src={stackblitzUrl}
            title="Multi-Step Form"
            height="820px"
            hideExplorer={false}
          />

          <p>Step 1: Set up your routes.</p>

          <Code language="js">{`import { Router, Route } from "@solidjs/router"
import { MultiStepForm } from "./multistep_form"
import { Step1 } from "./step1"
import { Step2 } from "./step2"
import { Result } from "./result"

export const App = () => {
  return (
    <Router>
      <Route path="/" component={MultiStepForm}>
        <Route path="/step1" component={Step1} />
        <Route path="/step2" component={Step2} />
        <Route path="/result" component={Result} />
      </Route>
    </Router>
  )
}`}</Code>

          <p>Step 2: Create your pages, collect the data and navigate to the next page.</p>

          <Code language="js">{`import { createForm, FormProvider } from 'solid-hook-form'

export const MultiStepForm = (props) => {
  const form = createForm({
    defaultValues: {
      addressLine1: '',
      addressLine2: '',
      firstName: '',
      lastName: ''
    }
    mode: 'onChange'
  })
  const { handleSubmit } = form

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <FormProvider form={form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  )
}
`}</Code>

          <p></p>

          <Code language="js">
            {`import { useFormContext } from 'solid-hook-form';
import { useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';

export const Step1 = () => {
  const navigate = useNavigate();
  const { register, errors, trigger, formState } =
    useFormContext();

  const onNext = () => {
    trigger();

    if (formState.isValid()) {
      navigate('/step2');
    }
  };

  return (
    <fieldset
      name="address"
    >
      <h3>Step 1</h3>

      <input {...register('addressLine1', { required: 'Required' })} />
      <Show when={errors.addressLine1}>
        <p role="alert">{errors.addressLine1?.message}</p>
      </Show>

      <input {...register('addressLine2', { required: 'Required' })} />
      <Show when={errors.addressLine2}>
        <p role="alert">{errors.addressLine2?.message}</p>
      </Show>

      <button type="button" onClick={onNext}>Next</button>
    </fieldset>
  );
};
`}
          </Code>

          <p>Step 3: Make final submission with all the data or display the resulting data.</p>

          <Code language="js">{`import { useFormContext } from 'solid-hook-form';
import { useNavigate } from '@solidjs/router';

export const Summary = () => {
  const navigate = useNavigate();
  const { getValues } = useFormContext();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h3>Result</h3>

      <p>
        Address: {getValues('addressLine1')} {getValues('addressLine2')}
      </p>
      <p>
        Contact: {getValues('firstName')} {getValues('lastName')}
      </p>

      <button type="submit">Submit</button>
      <button type="button" onClick={onBack}>
        Back
      </button>
    </div>
  );
};
`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default MultistepForm;
