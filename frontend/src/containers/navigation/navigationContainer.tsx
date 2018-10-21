import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "src/store";
import { setNavigationItem } from "src/store/navigation/actions";
import { NavigationEnum } from "src/store/navigation/types";

import "./navigationContainer.css";
import Button from "src/components/button/button";

export interface NavigationProps {
  selectedItem: NavigationEnum;
  setNavigationItem(item: NavigationEnum): void;
}

function mapStateToProps(state: ApplicationState): Partial<NavigationProps> {
  return {
    selectedItem: state.navigation.selectedItem
  };
}

class Navigation extends React.Component<NavigationProps> {
  public render(): React.ReactNode {
    return (
      <div className="navigation-container">
        <Button
          label="Search"
          onClick={() => this.props.setNavigationItem(NavigationEnum.Search)}
          toggle={true}
          selected={this._isSelected(NavigationEnum.Search)}
        />
        <Button
          label="Add"
          onClick={() => this.props.setNavigationItem(NavigationEnum.Add)}
          toggle={true}
          selected={this._isSelected(NavigationEnum.Add)}
        />
        <Button
          label="Analysis"
          onClick={() => this.props.setNavigationItem(NavigationEnum.Analysis)}
          toggle={true}
          selected={this._isSelected(NavigationEnum.Analysis)}
        />
        <div className="author">© 2018 Matija Marić, 0036479678</div>
      </div>
    );
  }

  private _isSelected(item: NavigationEnum) {
    const { selectedItem } = this.props;
    return item === selectedItem;
  }
}

const navigationContainer = connect(
  mapStateToProps,
  {
    setNavigationItem
  }
)(Navigation);
export { navigationContainer as Navigation };
