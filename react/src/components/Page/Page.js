// @flow
import React from 'react';
import PageHeader from './PageHeader';
import './Page.css';

type Props = {
  children: any,
};

export default class Page extends React.Component<Props> {
  render() {
    return (
      <div className="page">
        <PageHeader />
        <div className="page-content">{this.props.children}</div>
      </div>
    );
  }
}
