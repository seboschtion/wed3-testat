// @flow
import React from 'react';
import PageHeader from './PageHeader';

type Props = {
  children: any,
};

export default class Page extends React.Component<Props> {
  render() {
    return (
      <div className="page">
        <PageHeader />
        <div>{this.props.children}</div>
      </div>
    );
  }
}
