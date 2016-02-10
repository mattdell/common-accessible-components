import { createElement as $ } from 'react';
import { Icon as Element } from 'src/';
import { expect } from 'chai';
import sd from './utils/skin-deep';

let props = {};

describe('Icon', () => {
    beforeEach(() => {
        props = {
            name: 'submit'
        };
    });

    describe('should render in the DOM', () => {
        it('renders as <span>', () => {
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();
            const instance = tree.getMountedInstance();

            expect(vdom.props.className).to.match(/dd-icon/);
            expect(vdom).to.not.equal('undefined');
            expect(instance).to.not.equal('undefined');
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
    });
});
