import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';

class Icon extends Component {
    render() {
        return (
            <span className={Icon.getClasses(this.props)} aria-hidden="true"></span>
        );
    }
}

Icon.displayName = 'Icon';

Icon.propTypes = {
    className: PropTypes.string
};

Icon.getClasses = (props) => {
    const prefix = 'dd';
    const block = `${prefix}-${Icon.displayName.toLowerCase()}`;
    const extraClasses = props.className && props.className.split(' ');

    return cx(
        _.assign(
            {},
            { [block]: true },
            _.fromPairs(_.map(
                extraClasses, className => [className, true]
            ))
        )
    );
};

export default Icon;
