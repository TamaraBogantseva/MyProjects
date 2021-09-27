import React from 'react';

import './style.scss';


export default props => {
    const { name, text, date } = props;

    return <div className={ `msg-new ${name === 'Leia' ? 'user' : ''}` }>
        <p><b>{ name }</b></p>
        <p>{ text }</p>
        <p className="msg-new__date">{ date }</p>
    </div>;
}