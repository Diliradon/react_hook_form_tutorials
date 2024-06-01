/* eslint-disable no-console */
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { LoginInput } from './LoginInput';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const BASE_URL_EMAIL = 'https://jsonplaceholder.typicode.com/users?email=';

export interface InitialData {
  username: string;
  email: string;
  surname: string;
  sosial: {
    twitter: string;
    facebook: string;
  };
  phonsNumbers: string[];
  phNumbers: { number: string }[];
  age: number;
  dateOfBirday: Date;
}

export const LoginForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = useForm<InitialData>({
    defaultValues: {
      username: 'Vlad',
      email: '',
      surname: '',
      sosial: {
        twitter: '',
        facebook: '',
      },
      phonsNumbers: ['', ''],
      phNumbers: [{ number: '' }],
      age: 0,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } =
    formState;

  const onSubmit = (data: InitialData) => {
    console.log('Submited form', data);
  };

  const onError = (errorValues: FieldErrors<InitialData>) => {
    console.log('errors', errorValues);
  };

  const handleGetValue = () => {
    console.log('Get valew:', getValues());
  };

  const handleSetValue = () => {
    setValue('username', '', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const subscription = watch(value => {
      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className="m-2 flex flex-col gap-4 p-4"
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <div className="flex flex-col">
        <LoginInput
          title="Username"
          type="text"
          errorMessage={errors.username?.message || ''}
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required',
            },
          })}
        />

        <LoginInput
          title="Email"
          type="email"
          errorMessage={errors.email?.message || ''}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
            validate: {
              notAdmin: fieldValue => {
                return (
                  fieldValue !== 'admin@gmail.com' || 'Enter a different value'
                );
              },
              notBlackListed: fieldValue => {
                return (
                  !fieldValue.endsWith('baddomain.com') ||
                  'This domain is not supported'
                );
              },
              emailAvailable: async fieldValue => {
                const responce = await fetch(BASE_URL_EMAIL + fieldValue);
                const data = await responce.json();

                return !data.length || 'Email already exist';
              },
            },
          })}
        />

        <LoginInput
          title="Surname"
          type="text"
          errorMessage={errors.surname?.message || ''}
          {...register('surname', {
            required: {
              value: true,
              message: 'Surname is required',
            },
            disabled: !watch('username'),
          })}
        />

        <LoginInput
          title="Twitter"
          type="text"
          errorMessage={errors.sosial?.twitter?.message || ''}
          {...register('sosial.twitter', {
            required: {
              value: true,
              message: 'Twitter is required',
            },
          })}
        />

        <LoginInput
          title="Facebook"
          type="text"
          errorMessage={errors.sosial?.facebook?.message || ''}
          {...register('sosial.facebook', {
            required: {
              value: true,
              message: 'Facebook is required',
            },
          })}
        />

        <LoginInput
          title="Primary phone number"
          type="text"
          errorMessage=""
          {...register('phonsNumbers.0', {
            required: {
              value: true,
              message: 'Primary phone required',
            },
          })}
        />

        <LoginInput
          title="Secondary phone number"
          type="text"
          errorMessage=""
          {...register('phonsNumbers.1', {
            required: {
              value: true,
              message: 'Secondary phone required',
            },
          })}
        />
      </div>

      <div className="bottom-2 flex flex-col gap-2 p-4">
        <p>List of phons numbers</p>

        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <LoginInput
                title="Phon number"
                type="text"
                errorMessage=""
                {...register(`phNumbers.${index}.number`)}
              />

              {!!index && (
                <button type="button" onClick={() => remove(index)}>
                  Remove number
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="button" onClick={() => append({ number: '' })}>
          App new number
        </button>

        <LoginInput
          title="Age"
          type="number"
          errorMessage={errors.age?.message || ''}
          {...register('age', {
            min: 20,
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Age is required',
            },
          })}
        />

        <LoginInput
          title="Date of birday"
          type="date"
          errorMessage={errors.dateOfBirday?.message || ''}
          {...register('dateOfBirday', {
            valueAsDate: true,
            required: {
              value: true,
              message: 'Date of birday is required',
            },
          })}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className={twMerge(
            `
            mb-2 me-2 flex-1 rounded-full bg-yellow-400 px-5 py-2.5 text-center
            text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none
            focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900`,
            (!isDirty || !isValid || isSubmitting) && 'disabled:bg-slate-500',
          )}
        >
          Submit
        </button>

        <button
          className={twMerge(
            `
            mb-2 me-2 flex-1 rounded-full bg-orange-600 px-5 py-2.5 text-center
            text-sm font-medium text-white hover:bg-orange-700 focus:outline-none
            focus:ring-4 focus:ring-orange-300 dark:focus:ring-yellow-800`,
            (!isDirty || !isValid) && 'disabled:bg-slate-500',
          )}
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>

      <button type="button" onClick={handleGetValue}>
        Get value
      </button>

      <button type="button" onClick={handleSetValue}>
        Set value
      </button>

      <DevTool control={control} />
    </form>
  );
};
