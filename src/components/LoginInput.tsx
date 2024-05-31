import { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  type: string;
  errorMessage: string;
}

export const LoginInput = forwardRef<HTMLInputElement, Props>(
  ({ title, type, errorMessage, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className={`mb-2 text-sm font-medium text-green-700 dark:text-green-500`}
        >
          <p>{title}</p>
          <input
            className={`block w-full rounded-lg border p-2.5 text-sm`}
            ref={ref}
            {...rest}
          />
        </label>

        {!errorMessage && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-500">
            <span className="font-medium">Well done!</span>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

LoginInput.displayName = 'LoginInput';
