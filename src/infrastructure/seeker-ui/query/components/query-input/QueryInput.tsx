import { useState } from 'react';
import { VscArrowCircleDown, VscSend } from 'react-icons/vsc';
import { HttpVerb } from '../../../../../domain/enums/http.enum';
import {
  SkrButton,
  SkrSelect,
  SkrSelectOption,
  SkrTextInput
} from '../../../common';
import './QueryInput.css';

type action = 'send' | 'send and download' | undefined;

export interface SkrInputConfig {
  method: HttpVerb;
  url: string;
  action: action;
}

interface SkrQueryInputProps {
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
export const SkrQueryInput = ({
  onSend,
  type = HttpVerb.get
}: SkrQueryInputProps): JSX.Element => {
  const [text, setText] = useState('');
  // Object returned when user submit.
  const input: SkrInputConfig = {
    method: type,
    url: text,
    action: undefined
  };

  const handleTextChange = (text: string) => {
    setText(text);
    input.url = text;
  };

  const handleSelect = (typeId: HttpVerb) => {
    input.method = typeId;
  };

  const handleOnSend = (action: action) => {
    input.action = action;
    onSend(input);
  };

  return (
    <div className="skr-query-input__container ">
      <SkrSelect
        options={typeOptions}
        label="Request types"
        selectedId={type}
        onSelect={handleSelect}
        className="skr-query-input__items-select"
      />
      <SkrTextInput
        value={text}
        onChange={handleTextChange}
        className="skr-query-input__items-input-text"
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
