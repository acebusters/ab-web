import React, { PropTypes } from 'react';
import FormGroup from './FormGroup';
import Input from '../Input';
import Label from '../Label';
import Dropdown from '../Dropdown';
import { ErrorMessage, WarningMessage } from '../../components/FormMessages';

import {
  ControlWrapper,
} from './styles';

const TokenAmountField = ({
  input,
  label,
  type,
  amountUnit,
  setAmountUnit,
  meta: { touched, error, warning },
  ...props
}) => (
  <FormGroup>
    <Label htmlFor={input.name}>{label}</Label>
    <ControlWrapper>
      <Input {...input} {...props} type={type} id={input.name} />
      <Dropdown
        selected={amountUnit}
        onSelect={setAmountUnit}
        {...props}
      />
    </ControlWrapper>

    {touched && error && <ErrorMessage error={error} />}
    {touched && warning && <WarningMessage error={warning} />}
  </FormGroup>
);

TokenAmountField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.node,
  type: PropTypes.string,
  meta: PropTypes.object,
  amountUnit: PropTypes.string,
  setAmountUnit: PropTypes.func,
};

export default TokenAmountField;
