import React from 'react';

export function hasChild(children, component) {
    const newChildren = React.Children.toArray(children);

    for (const child of newChildren) {
        if (child.type && child.type === component) {
            return true;
        } else if (component === typeof child) {
            return true;
        }
    }

    return false;
}
