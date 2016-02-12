import { createElement as $ } from 'react';
import { Input as Element } from 'src/';
import _ from 'lodash';
import { expect } from 'chai';
import sd from './utils/skin-deep';

let props = {};

describe('Input', () => {
    beforeEach(() => {
        props = {
            name: 'username'
        };
    });

    describe('should render in the DOM', () => {
        it('renders as <Input>', () => {
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();
            const instance = tree.getMountedInstance();

            expect(vdom.props.className).to.match(/dd-input/);
            expect(vdom.props.type).to.equal('text');
            expect(vdom).to.not.equal('undefined');
            expect(instance).to.not.equal('undefined');
        });

        it('should have various types', () => {
            props.type = 'email';
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();

            expect(vdom.props.type).to.equal('email');
            expect(vdom.props.className).to.match(/dd-input--email/);
        });

        it('should support extra classes', () => {
            props.className = 'custom digital';
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();

            expect(vdom.props.className).to.match(/custom digital/);
        });

        it('passes unused data props', () => {
            props['data-digital'] = 'digital';
            props.dataTest = 'test';
            props['aria-labelledby'] = 'digital';

            const vdom = sd.shallowRender($(Element, props)).getRenderOutput();

            expect(vdom.props).to.have.property('data-digital', 'digital');
            expect(vdom.props).to.have.property('dataTest', 'test');
            expect(vdom.props).to.have.property('aria-labelledby', 'digital');
        });

        it('binding events to the instance', () => {
            const state = { isClicked: true };
            const inputEventNames = [
                'onClick',
                'onChange',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp',
                'onTouchStart',
                'onTouchEnd',
                'onTouchCancel',
                'onMouseDown',
                'onMouseEnter',
                'onMouseLeave',
                'onFocus',
                'onBlur'
            ];

            _.map(inputEventNames, (eventName) => {
                props[eventName] = function (event) {
                    this.setState(state);
                    event.preventDefault();
                };

                const tree = sd.shallowRender($(Element, props));
                tree.props[eventName]({
                    preventDefault() {}
                });

                expect(tree.getMountedInstance().state).to.eql(state);
            });
        });
    });
});
