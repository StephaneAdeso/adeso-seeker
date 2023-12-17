import { ReactNode, useState } from 'react';
import './TabsContainer.css';

interface TabContainerProps {
  children?: React.ReactNode;
  tabs: SkrTabProps[];
  className?: string;
}

export interface SkrTabProps {
  label: string;
  id?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
}

export const SkrTabContainer = ({
  children,
  tabs,
  className = ''
}: TabContainerProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const handleClick = (key: string) => {
    setSelectedTab(key);
  };

  return (
    <div className={`skr-tabs__container ${className}`}>
      <div className="skr-tabs__header">
        {tabs.map((tab) => (
          <button
            className={`skr-tabs__header-button ${
              selectedTab === tab.id
                ? 'skr-tab__header-button--active'
                : 'skr-tabs__header-button--inactive'
            }`}
            key={tab.id}
            onClick={() => handleClick(tab.id!)}
          >
            {tab.label}
          </button>
        ))}
        {children && (
          <div className="skr-tabs__header-childrens">{children}</div>
        )}
      </div>

      {tabs.map((tab) => {
        if (tab.id === selectedTab) {
          return (
            <div className={` skr-tab__content--active`} key={tab.id}>
              {tab.children}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
