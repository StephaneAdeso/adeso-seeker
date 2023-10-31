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

type action = 'send' | 'send and download' | undefined;
export interface SkrInput {
  type: HttpVerb;
  url: string;
  action: action;
}

interface SkrRequestInputProps {
  onSend: (value: any) => void;
  type?: HttpVerb;
}

const typeOptions: SkrSelectOption[] = Object.values(HttpVerb).map((value) => {
  return {
    id: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value: value
  };
});

//     COMPONENT -------------------------------------------------------
export const SkrRequestInput = ({
  onSend,
  type = HttpVerb.get
}: SkrRequestInputProps): JSX.Element => {
  const [text, setText] = useState('');
  // Object returned when user submit.
  const input: SkrInput = {
    type: type,
    url: text,
    action: undefined
  };

  const handleTextChange = (text: string) => {
    setText(text);
    input.url = text;
  };

  const handleSelect = (typeId: HttpVerb) => {
    input.type = typeId;
  };

  const handleOnSend = (action: action) => {
    input.action = action;
    onSend(input);
  };

  return (
    <div className="skr-request-input__container">
      <SkrSelect
        options={typeOptions}
        label="Request types"
        selectedId={type}
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
        onClick={() => handleOnSend('send')}
        ariaLabel="Send button"
      />
      <SkrButton
        label="Send and download"
        icon={VscArrowCircleDown}
        iconPosition="before"
        onClick={() => handleOnSend('send and download')}
        ariaLabel="Send and download button"
        hideLabel
      />
    </div>
  );
};
