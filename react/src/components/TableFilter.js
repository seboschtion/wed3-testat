import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class TableFilter extends React.Component {
    render() {
        return (
            <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
                <Dropdown.Menu>
                <Dropdown.Header icon='tags' content='Filter by tag' />
                <Dropdown.Divider />
                <Dropdown.Item>Important</Dropdown.Item>
                <Dropdown.Item>Announcement</Dropdown.Item>
                <Dropdown.Item>Discussion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default TableFilter
