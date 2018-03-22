import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class TableFilter extends React.Component {
    prepareDropdownItems(items) {
        let result = [];
        items.forEach(function(item) {
        });
        return result;
    }

    handleChange(e, data) {
        console.log(e);
    }
    
    render() {
        return (
            <Dropdown placeholder={this.props.name} onChange={this.handleChange} icon='filter' labeled button closeOnChange className='icon' options={this.prepareDropdownItems(this.props.items)}>
                <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content={"Filtern nach " + this.props.name} />
                    <Dropdown.Divider />
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default TableFilter
