import React, { Component } from 'react';
import { Button, Icon } from '../../../src';

const playgroundName = Button.displayName;

const handleClick = function () {
    console.log('I am icon button: ', Button.isIconButton(this.props));
};

export default class ButtonPlayground extends Component {
    render() {
        return (
            <div className={`playground playground--${playgroundName}`}>
                <h2>{Button.displayName} component Playground</h2>
                <Button
                    name="submit"
                    type="submit"
                    onClick={handleClick}
                    data-one="one"
                >
                    Submit
                </Button>

                <Button
                    name="next"
                    kind="primary"
                    size="large"
                    onClick={handleClick}
                    aria-label="my icon button"
                >
                    <Icon className="glyph glyphicon-heart" />
                </Button>


                <Button
                    name="submit"
                    type="submit"
                    onClick={handleClick}
                    disabled
                >
                    Not available
                </Button>
            </div>
        );
    }
}
