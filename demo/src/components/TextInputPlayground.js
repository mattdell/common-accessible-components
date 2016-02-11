import React, { Component } from 'react';
import { TextInput } from '../../../src';

const playgroundName = TextInput.displayName;

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
                    disabled
                />
            </div>
        );
    }
}
