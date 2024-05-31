/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { LoginInput } from './LoginInput';
import { DevTool } from '@hookform/devtools';

export interface InitialData {
  username: string;
  email: string;
  surname: string;
}

export const LoginForm = () => {
  const { register, control, handleSubmit, formState } = useForm<InitialData>({
    defaultValues: {
      username: 'Vlad',
      email: '',
      surname: '',
    },
  });

  const { errors } = formState;

  const onSubmit = (data: InitialData) => {
    console.log('Submited form', data);
  };

  return (
    <form
      className="m-2 flex flex-col items-center gap-4 p-4"
      onSubmit={handleSubmit(onSubmit)}
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
          })}
        />
      </div>

      <button
        type="submit"
        className={`
          mb-2 me-2 rounded-full bg-yellow-400 px-5 py-2.5 text-center
          text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none
          focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900`}
      >
        Green
      </button>
      <DevTool control={control} />
    </form>
  );
};
