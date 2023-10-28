import { useState } from 'react';
import { SkrTab, SkrTabProps } from './../index';
import './TabsContainer.css';

interface TabContainerProps {
  tabs: SkrTabProps[];
  className?: string;
}

export const SkrTabContainer = ({
  tabs,
  className = ''
}: TabContainerProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const handleClick = (key: string) => {
    setSelectedTab(key);
  };

  return (
    <div className={`skr-tabs-container ${className}`}>
      <div className="skr-tabs-header">
        {tabs.map((tab) => (
          <button
            className={`skr-tabs-header__button ${
              selectedTab === tab.id
                ? 'skr-tab-header__button--active'
                : 'skr-tabs-header__button--inactive'
            }`}
            key={tab.id}
            onClick={() => handleClick(tab.id!)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={` skr-tab-content--active`}>
        {tabs.map((tab) => {
          if (tab.id === selectedTab) {
            return (
              <SkrTab key={tab.id} label={tab.label}>
                {tab.children}
              </SkrTab>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
