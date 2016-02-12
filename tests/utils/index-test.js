import React, { createElement as $ } from 'react';
import { hasChild } from 'src/utils';
import { Button as Element, Icon } from 'src/';
import { expect } from 'chai';
import sd from '../../test-helpers/skin-deep';

let props = {};

describe('Utils', () => {
    describe('should return correct values for hasChild', () => {
        beforeEach(() => {
            props = {
                name: 'icon'
            };
        });

        it('returns true if child exists', () => {
            const tree = sd.shallowRender($(Element, props, <Icon name="glyphicon" />));
            const vdom = tree.getRenderOutput();

            console.log(hasChild(tree));
        });
    });
});
