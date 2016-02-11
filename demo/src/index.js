import React, { Component } from 'react';
import { render } from 'react-dom';

import ButtonPlayground from './components/ButtonPlayground';
import TextInputPlayground from './components/TextInputPlayground';

class ComponentsPlayground extends Component {
    render() {
        return (
            <div>
                <h1>Components Playground</h1>
                <ButtonPlayground/>
                <TextInputPlayground/>
            </div>
        );
    }
}

render(<ComponentsPlayground/>, document.querySelector('#demo'));
