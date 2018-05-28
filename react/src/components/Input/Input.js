// @flow
import React from 'react';
import './Input.css';

type Props = {
  label: string,
  value: string,
  type: string,
  onChange: any,
  disabled: boolean,
  step: string,
  name: string,
  pattern: string,
  min: number,
};

type State = {
  id: number,
};

export default class Input extends React.Component<Props, State> {
  state: State = {
    id: 0,
  };

  componentWillMount() {
    this.createId();
  }

  createId() {
    const randomId = Math.floor(Math.random() * 1000000000);
    this.setState({ id: randomId });
  }

  renderMinError() {
    if (this.props.min && this.props.value && this.props.value.length < this.props.min) {
      return <small className="error">Bitte geben Sie mindestens 3 Zeichen an.</small>;
    }
    return '';
  }

  render() {
    return (
      <label htmlFor={this.state.id}>
        {this.props.label}
        <input
          id={this.state.id}
          type={this.props.type}
          onChange={this.props.onChange}
          placeholder={this.props.label}
          value={this.props.value}
          disabled={this.props.disabled}
          step={this.props.step}
          name={this.props.name}
          pattern={this.props.pattern}
        />
        {this.renderMinError()}
      </label>
    );
  }
}
