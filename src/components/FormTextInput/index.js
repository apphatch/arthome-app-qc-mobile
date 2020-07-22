import React from 'react';
import TextInput from '../TextInput';

const FormTextInput = (props) => {
  const {
    name,
    register,
    setValue,
    value,
    disabled,
    label,
    clearErrors,
  } = props;

  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setValue(name, localValue);
  }, [name, register, localValue, setValue]);

  return (
    <TextInput
      label={label}
      ref={register({ name: name })}
      onChangeText={(text) => {
        setValue(name, text, true);
        setLocalValue(text);
        clearErrors(name);
      }}
      value={localValue}
      disabled={disabled}
    />
  );
};

export default React.memo(FormTextInput);
