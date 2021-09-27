import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './Input.scss'

const SelectInput = ({ label, propValue, customClass, customLabel, classNameInput, items, inputName, onChange, placeholder }) => {

    return (
        <div className={ `add-card-modal ${customClass}` }>
            <label htmlFor={ inputName } className={ `label ${customLabel}` }>{ label }</label>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={ propValue }
                onChange={ onChange }
                name={ inputName }
                className={ `input ${classNameInput}` }
                disableUnderline={ true }
                displayEmpty={ true }
                renderValue={ (selected) => {
                    if (selected.length === 0) {
                        return <em className='select-placeholder'>{ placeholder }</em>;
                    }

                    return selected;
                } }
            >
                <MenuItem value="" disabled >
                    { placeholder }
                </MenuItem>
                { items.map((item) => (
                    <MenuItem key={ item } value={ item } >
                        { item }
                    </MenuItem>
                )) }
            </Select>
        </div>
    )
}

export default SelectInput;