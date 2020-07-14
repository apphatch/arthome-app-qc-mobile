import React from 'react';
import TextInput from '../TextInput';

const FormTextInput = props => {
  const {
    name,
    register,
    setValue,
    value,
    disabled,
    label,
    clearError,
  } = props;

  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setValue(name, localValue);
  }, [name, register]);

  return (
    <TextInput
      label={label}
      ref={register({ name: name })}
      onChangeText={text => {
        setValue(name, text, true);
        setLocalValue(text);
        clearError(name);
      }}
      value={localValue}
      disabled={disabled}
    />
  );
};

export default React.memo(FormTextInput);
