// @flow
import React from 'react';
import './Window.css';

type Props = {
  title: string,
  children: any,
};

export default class Window extends React.Component<Props> {
  render() {
    return (
      <div className="window">
        <h3>{this.props.title}</h3>
        <div className="window-content">{this.props.children}</div>
      </div>
    );
  }
}
