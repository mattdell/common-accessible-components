import React, {Component} from 'react';
import {render} from 'react-dom';

import ButtonPlayground from './components/ButtonPlayground';

class ComponentsPlayground extends Component {
    render() {
        return (
            <div>
                <h1>Components Playground</h1>
                <ButtonPlayground/>
            </div>
        );
    }
}

render(<ButtonPlayground/>, document.querySelector('#demo'))
