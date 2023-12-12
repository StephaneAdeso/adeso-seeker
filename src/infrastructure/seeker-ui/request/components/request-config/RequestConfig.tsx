import {
  SkrButton,
  SkrLabel,
  SkrSelect,
  SkrSelectOption
} from '../../../common';
//import { IconType } from 'react-icons';
import { VscLayers, VscSave } from 'react-icons/vsc';
import './RequestConfig.css';

const envOptions: SkrSelectOption[] = [];

interface requestConfigProps {
  className?: string;
}

export const SkrRequestConfig = ({ className = '' }: requestConfigProps) => {
  return (
    <div className={`skr-request-config-container ${className}`}>
      <SkrSelect
        label="Environment selector"
        skrLabel={<SkrLabel label="Selected environment" />}
        options={envOptions}
      ></SkrSelect>
      <SkrButton
        label="Environment manager"
        icon={VscLayers}
        hideLabel
      ></SkrButton>
      <SkrButton label="Save request" icon={VscSave} hideLabel></SkrButton>
    </div>
  );
};
