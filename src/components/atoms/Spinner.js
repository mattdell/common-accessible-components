import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';

class Spinner extends Component {
    render() {
        return <span className={Spinner.getClasses(this.props)}></span>;
    }
}

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
    className: PropTypes.string
};

Spinner.getClasses = (props) => {
    const prefix = 'dd';
    const block = `${prefix}-${Spinner.displayName.toLowerCase()}`;
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

export default Spinner;
