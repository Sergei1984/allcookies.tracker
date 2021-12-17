import React from 'react';

export const useForm = <TData,>(initialData: TData) => {
  const [formData, setData] = React.useState(initialData);
  const handleChange = React.useCallback(
    (value: string, name: string) => {
      setData((state: TData) => {
        return {
          ...state,
          [name]: value,
        };
      });
    },
    [formData],
  );
  return {formData, handleChange};
};
