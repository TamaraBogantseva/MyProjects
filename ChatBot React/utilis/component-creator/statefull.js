const fs = require('fs');
const path = require('path');

module.exports = componentName => {
    const content = `
    import React, { Component } from 'react';
    import './style.scss';
    
    export default class MessageList extends Component {
        constructor (props) {
            super(props);
            this.state = {
                
            };
        }
 
        render() {
            return <div className="${componentName.toLowerCase()}">
            
            </div>;
        }
    };
    `;

    fs.writeFileSync(
        path.resolve(__dirname, '..', '..', 'src', 'components', componentName, `${componentName}.jsx`),
        content
    );
};
