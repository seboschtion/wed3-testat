// @flow
import React from 'react';
import './Window.css';

type Props = {
  title: string,
  children: any,
  left: boolean,
  center: boolean,
};

export default class Window extends React.Component<Props> {
  getClassName(): string {
    const base = 'window';
    if (this.props.left) {
      return `${base} ${base}-left`;
    }
    if (this.props.center) {
      return `${base} ${base}-center`;
    }
    return base;
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <h3>{this.props.title}</h3>
        <div className="window-content">{this.props.children}</div>
      </div>
    );
  }
}
