import { forwardRef, useId } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  prefix?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className = '', error, hint, id, label, prefix, required, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const descriptionId = `${inputId}-description`;

    return (
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-black" htmlFor={inputId}>
          {label}
          {required ? <span className="sr-only"> (required)</span> : null}
        </label>
        <div className="relative">
          {prefix ? (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-black/50">
              {prefix}
            </span>
          ) : null}
          <input
            ref={ref}
            aria-describedby={hint || error ? descriptionId : undefined}
            aria-invalid={Boolean(error)}
            className={`border-line min-h-12 w-full border bg-white px-4 text-sm outline-none transition-colors focus:border-black focus:ring-0 ${prefix ? 'pl-12' : ''} ${error ? 'border-red-700' : ''} ${className}`}
            id={inputId}
            required={required}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-red-700" id={descriptionId} role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-black/50" id={descriptionId}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
