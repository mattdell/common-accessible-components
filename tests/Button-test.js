import React, { createElement as $ } from 'react';
import { Button as Element, Icon } from 'src/';
import { expect } from 'chai';
import sd from 'src/utils/skin-deep';

let props = {};

describe('Button', () => {
    beforeEach(() => {
        props = {
            name: 'submit'
        };
    });

    describe('should render in the DOM', () => {
        it('renders as <button>', () => {
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();
            const instance = tree.getMountedInstance();

            expect(vdom.props.className).to.match(/dd-button/);
            expect(vdom.type).to.equal('button');
            expect(vdom).to.not.equal('undefined');
            expect(instance).to.not.equal('undefined');
        });

        it('should have various sizes', () => {
            props.size = 'small';
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();

            expect(vdom.props.className).to.match(/dd-button--small/);
        });

        it('should have various button kinds', () => {
            props.kind = 'primary';
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();

            expect(vdom.props.className).to.match(/dd-button--primary/);
        });

        it('should support extra classes', () => {
            props.className = 'custom digital';
            const tree = sd.shallowRender($(Element, props));
            const vdom = tree.getRenderOutput();

            expect(vdom.props.className).to.match(/custom digital/);
        });

        it('should allow a single icon as a child', () => {
            props['aria-label'] = 'icon button';
            const tree = sd.shallowRender($(Element, props, <Icon name="glyph glyphicon-heart" />));
            const vdom = tree.getRenderOutput();

            expect(vdom.props).to.have.property('children');
            expect(vdom.props.children).to.deep.equal(<Icon name="glyph glyphicon-heart" />);
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
