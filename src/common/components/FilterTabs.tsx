import React from 'react';
import { connect } from 'react-redux';
import './FilterTabs.scss';

interface Props {
  currentTab: string;
  tabs: any;
  clickTab: any;
}

const mapStateToProps = (state: any, props?: Props) => {
  return {};
};

class FilterTabs extends React.PureComponent<Props, any> {
  public render() {
    const { tabs, currentTab, clickTab } = this.props;
    return (
      <div className="FilterTabs">
        {tabs.map((tab, index) => {
          return (
            <div
              className={`filter-tab ${tab === currentTab ? 'active' : ''}`}
              key={index}
              onClick={() => clickTab(tab)}>
              {tab}
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FilterTabs);
