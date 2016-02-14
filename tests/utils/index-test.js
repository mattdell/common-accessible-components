import React, { createElement as $ } from 'react';
import { hasChild } from 'src/utils';
import { Button as Element, Icon, Label } from 'src/';
import { expect } from 'chai';
import sd from '../../test-helpers/skin-deep';

let props = {};

describe('Utils', () => {
    describe('hasChild should return correct values', () => {
        beforeEach(() => {
            props = {
                name: 'icon',
                'aria-label': 'icon button'
            };
        });

        it('returns true if the specified child exists', () => {
            const tree = sd.shallowRender($(Element, props, <Icon name="glyphicon" />));
            const vdom = tree.getRenderOutput();

            expect(hasChild(vdom.props.children, Icon)).to.equal(true);
        });
        it('returns false if the specified child does not exist', () => {
            let tree = sd.shallowRender(
                $(Element, props, <Label name="username" htmlFor="username">Username</Label>)
            );
            let vdom = tree.getRenderOutput();

            expect(hasChild(vdom.props.children, Icon)).to.equal(false);

            tree = sd.shallowRender($(Element, props));
            vdom = tree.getRenderOutput();

            expect(hasChild(vdom.props.children, Icon)).to.equal(false);
        });
    });
});
