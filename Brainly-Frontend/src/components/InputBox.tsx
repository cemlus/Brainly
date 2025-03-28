interface InputParams {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string
}

export function Input({ onChange, placeholder, type }: InputParams) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        onChange={onChange}
      />
    </div>
  );
}
