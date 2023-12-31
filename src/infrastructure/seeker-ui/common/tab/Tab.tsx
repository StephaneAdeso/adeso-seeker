/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';
import './Tab.css';
export interface SkrTabProps {
  label: string;
  id?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export const SkrTab: React.FunctionComponent<SkrTabProps> = ({
  label,
  id = label,
  disabled = false,
  children
}: SkrTabProps): JSX.Element => {
  return <div className="skr-tab-container">{children}</div>;
};
