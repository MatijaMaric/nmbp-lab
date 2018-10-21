import * as React from "react";
import { DateRangePicker } from "@blueprintjs/datetime";
import { connect } from "react-redux";
import { ApplicationState } from "src/store";

import "@blueprintjs/datetime/";
import "./queriesFilter.css";

export interface QueriesFilterProps {}

export interface QueriesFilterState {
  startDate: Date;
  endDate: Date;
  byDay: boolean;
}

function mapStateToProps(state: ApplicationState): Partial<QueriesFilterProps> {
  return {};
}

class QueriesFilter extends React.Component<
  QueriesFilterProps,
  QueriesFilterState
> {
  public constructor(props: QueriesFilterProps) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      byDay: true
    };
  }

  public render(): React.ReactNode {
    const byDay = this.state.byDay;
    return (
      <div className="queries-filter-container">
        <DateRangePicker
          value={[this.state.startDate, this.state.endDate]}
          onChange={this._onDateChange}
          timePrecision={"minute"}
          allowSingleDayRange={true}
          minDate={!byDay ? new Date() : undefined}
          maxDate={!byDay ? new Date() : undefined}
        />
        <div className="day-hour">
          <div>
            <input
              type="radio"
              name="method"
              value="day"
              onChange={this._onByDayChanged}
              checked={this.state.byDay}
            />
            <label htmlFor="day">day</label>
          </div>
          <div>
            <input
              type="radio"
              name="method"
              value="time"
              onChange={this._onByDayChanged}
              checked={!this.state.byDay}
            />
            <label htmlFor="time">time</label>
          </div>
        </div>
      </div>
    );
  }

  private _onByDayChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
        byDay: event.target.value === "day"
    });

  private _onDateChange = ([startDate, endDate]: [Date, Date]) => {
    this.setState({
      startDate,
      endDate
    });
  };
}

const queriesFilterContainer = connect(
  mapStateToProps,
  {}
)(QueriesFilter);
export { queriesFilterContainer as QueriesFilter };
