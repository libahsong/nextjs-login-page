import { KeyIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  errors: string[];
  errorStatus: boolean;
  errorName: string;
}

export default function Input({
  type,
  placeholder,
  name,
  required,
  errors,
  errorStatus,
  errorName,
}: InputProps) {
  console.log(errors);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative flex items-center">
        {name === "email" ? (
          <EnvelopeIcon className="absolute size-5 ml-5 text-gray-500" />
        ) : name === "username" ? (
          <UserIcon className="absolute size-5 ml-5 text-gray-500" />
        ) : (
          <KeyIcon className="absolute size-5 ml-5 text-gray-500" />
        )}
        <input
          className={`py-4 pl-12 rounded-full w-full ring outline-transparent focus:ring-offset-2 ${
            errorStatus && name === errorName
              ? "ring-red-400 focus:outline-red-400"
              : "ring-gray-300 focus:outline-gray-300"
          }`}
          type={type}
          placeholder={placeholder}
          name={name}
          required={required}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
