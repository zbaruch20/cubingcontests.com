import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormTextInput = ({
  title,
  id,
  value,
  placeholder = '',
  monospace = false,
  disabled = false,
  isPassword = false,
  required = false,
  setValue,
  onFocus,
  onBlur,
  onKeyDown,
}: {
  title?: string;
  id?: string;
  placeholder?: string;
  monospace?: boolean;
  disabled?: boolean;
  isPassword?: boolean;
  required?: boolean;
  value: string;
  setValue: any;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: any) => void;
}) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  if (!id && !title) {
    throw new Error('Neither title nor id are set in FormTextInput!');
  }

  return (
    <div className="mb-3 fs-5">
      {title && (
        <label htmlFor={id} className="form-label">
          {title}
        </label>
      )}
      <div className="d-flex justify-content-between align-items-center gap-3">
        <input
          type={hidePassword ? 'password' : 'text'}
          id={id || title}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={(e: any) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          className={'flex-grow-1 form-control' + (monospace ? ' font-monospace' : '')}
        />
        {isPassword && (
          <button
            type="button"
            className="px-2 pt-0 pb-1 btn btn-primary fs-5"
            onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormTextInput;
