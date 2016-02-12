import React, { Component } from 'react';
import { TextInput } from '../../../src';
import _ from 'lodash';

const playgroundName = TextInput.displayName;

const camelCase = _.camelCase;

function handleChange(event) {
    console.log(camelCase(event.target.value));
}

export default class TextInputPlayground extends Component {
    render() {
        return (
            <div className={`playground playground--${playgroundName}`}>
                <h2>{TextInput.displayName} component Playground</h2>
                <TextInput
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
