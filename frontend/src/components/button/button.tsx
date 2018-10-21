import * as React from "react";

import './button.css';

export interface ButtonProps {
  label: string;
  toggle?: boolean;
  selected?: boolean;
  onClick?(): void;
}

export default class Button extends React.Component<ButtonProps> {
  public render(): React.ReactNode {
    const {
        label,
        onClick
    } = this.props;
    return (
      <div
        className={`button${this._isSelected()}`}
        onClick={onClick}
      >
        {label}
      </div>
    );
  }

  private _isSelected() {
      const {
        toggle,
        selected
      } = this.props;

      return toggle && selected ? ' selected' : '';
  }
}
