import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

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
          className={twMerge(
            `mb-2 text-sm font-medium text-green-700 dark:text-green-500`,
            errorMessage && 'text-red-700 dark:text-red-500',
          )}
        >
          <p>{title}</p>

          <input
            className={twMerge(
              `block w-full rounded-lg border p-2.5 text-sm`,
              errorMessage && 'border-red-500 text-red-900',
            )}
            ref={ref}
            {...rest}
          />
          {!!errorMessage && (
            <p
              className={twMerge(
                `mt-2 text-sm`,
                errorMessage && 'text-red-700',
              )}
            >
              <span className="font-medium">{errorMessage}</span>
            </p>
          )}
        </label>
      </div>
    );
  },
);

LoginInput.displayName = 'LoginInput';
