import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "src/store";

import './queriesPivot.css';

export interface QueriesPivotProps {}

function mapStateToProps(state: ApplicationState): Partial<QueriesPivotProps> {
  return {};
}

class QueriesPivot extends React.Component<QueriesPivotProps> {
  public render(): React.ReactNode {
    return <div className="queries-pivot-container">BUREK</div>;
  }
}

const queriesPivotContainer = connect(
  mapStateToProps,
  {}
)(QueriesPivot);
export { queriesPivotContainer as QueriesPivot };
