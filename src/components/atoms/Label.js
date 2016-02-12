import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';

class Label extends Component {
    render() {
        const { className, required, ...other } = this.props;
        return (
            <label
                className={Label.getClasses(this.props)}
                {...other}
            >
                {this.props.children}
            </label>
        );
    }
}

Label.displayName = 'Label';

Label.propTypes = {
    className: PropTypes.string,
    required: PropTypes.bool,
    children: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired
};

Label.getClasses = (props) => {
    const prefix = 'dd';
    const block = `${prefix}-${Label.displayName.toLowerCase()}`;
    const requiredMod = `${block}--required`;
    const extraClasses = props.className && props.className.split(' ');

    return cx(
        _.assign(
            {},
            { [block]: true },
            { [requiredMod]: !!props.required },
            _.fromPairs(_.map(
                extraClasses, className => [className, true]
            ))
        )
    );
};

export default Label;
