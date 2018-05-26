// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  name: string,
  className: string,
  items: Array<any>,
  filterChangedCallback: any,
};

export default class TableFilter extends React.Component<Props> {
  handleChange = (e, data) => {
    this.props.filterChangedCallback(data.value);
  };

  render() {
    return (
      <Dropdown
        placeholder={this.props.name}
        onChange={this.handleChange}
        icon="filter"
        labeled
        button
        closeOnChange
        className={`${this.props.className} icon`}
        options={this.props.items}
        header={`Filtern nach ${this.props.name}`}
      />
    );
  }
}
