import React, { Component } from 'react';
import { Input } from '../../../src';
import _ from 'lodash';

const playgroundName = Input.displayName;

function handleChange(event) {
    console.log(_.camelCase(event.target.value));
}

export default class InputPlayground extends Component {
    render() {
        return (
            <div className={`playground playground--${playgroundName}`}>
                <h2>{Input.displayName} component Playground</h2>
                <Input
                    name="username"
                    className="username"
                    data-one="one"
                    defaultValue="test"
                    type="email"
                    onChange={handleChange}
                />
            </div>
        );
    }
}
