import React from 'react';
import TextInput from '../TextInput';

const FormTextInput = props => {
  const { name, register, setValue, value, disabled, label } = props;

  const [localValue, setLocalValue] = React.useState(value);

  return (
    <TextInput
      label={label}
      ref={register({ name: name })}
      onChangeText={text => {
        setValue(name, text, true);
        setLocalValue(text);
      }}
      value={localValue}
      disabled={disabled}
    />
  );
};

export default React.memo(FormTextInput);
