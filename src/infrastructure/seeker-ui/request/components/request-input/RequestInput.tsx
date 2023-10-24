import { useState } from 'react';
import { VscArrowCircleDown, VscSend } from 'react-icons/vsc';
import { HttpVerb } from '../../../../../domain/enums/http-verbs.enum';
import {
  SkrButton,
  SkrSelect,
  SkrSelectOption,
  SkrTextInput
} from '../../../common';
import './RequestInput.css';

const options: SkrSelectOption[] = Object.values(HttpVerb).map((value) => {
  return {
    id: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value: value
  };
});

export const SkrRequestInput = () => {
  const [text, setText] = useState('');

  const handleTextChange = (value: string) => {
    setText(value);
    console.log(value);
  };

  // SELECT

  const handleSelect = (value: string) => {
    console.log(value);
  };
  // FIN DE SELECT

  return (
    <div className="skr-request-input__container">
      <SkrSelect
        options={options}
        label="Request types"
        selectedId="get"
        onSelect={handleSelect}
        className="skr-request-input__items-select"
      />
      <SkrTextInput
        value={text}
        onChange={handleTextChange}
        className="skr-request-input__items-input-text"
      />
      <SkrButton
        label="Send request"
        icon={VscSend}
        hideLabel
        ariaLabel="Save button"
      />
      <SkrButton
        label="Send and download"
        icon={VscArrowCircleDown}
        iconPosition="before"
        ariaLabel="Send and download button"
        hideLabel
      />
    </div>
  );
};
