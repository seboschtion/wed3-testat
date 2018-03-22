import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class TableFilter extends React.Component {
    handleChange = (e, data) => {
        this.props.filterChangedCallback(data.value);
    }
    
    render() {
        return (
            <Dropdown placeholder={this.props.name} onChange={this.handleChange} icon="filter" labeled button closeOnChange className={this.props.className + " icon"} options={this.props.items} header={"Filtern nach " + this.props.name}>
            </Dropdown>
        )
    }
}

export default TableFilter
