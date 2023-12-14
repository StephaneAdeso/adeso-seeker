import {
  SkrButton,
  SkrLabel,
  SkrSelect,
  SkrSelectOption
} from '../../../common';
//import { IconType } from 'react-icons';
import { VscLayers, VscSave } from 'react-icons/vsc';
import './QueryConfig.css';

const envOptions: SkrSelectOption[] = [];

interface SkrQueryConfigProps {
  className?: string;
}

export const SkrQueryConfig = ({ className = '' }: SkrQueryConfigProps) => {
  return (
    <div className={`skr-query-config__container ${className}`}>
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
