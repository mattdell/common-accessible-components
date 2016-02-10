import { createElement as $ } from 'react';
import { Spinner as Element } from 'src/';
import { expect } from 'chai';
import sd from './utils/skin-deep';

let props = {};

describe('Spinner', () => {
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

            expect(vdom.props.className).to.match(/dd-spinner/);
            expect(vdom).to.not.equal('undefined');
            expect(instance).to.not.equal('undefined');
        });
    });
});
