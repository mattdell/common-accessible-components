import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { hasChild } from '../utils';
import isRequiredIf from 'react-proptype-conditional-require';
import cx from 'classnames';

const buttonTypes = ['button', 'submit', 'reset'];

const kinds = [
    'default',
    'primary',
    'secondary',
    'danger',
    'link'
];

const buttonSizes = [
    'small',
    'large',
    'full-width'
];

const buttonEventNames = [
    'onClick',
    'onTouchStart',
    'onTouchEnd',
    'onTouchCancel',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onFocus',
    'onBlur'
];

class Button extends Component {
    constructor(properties) {
        super(properties);
    }

    render() {
        const { kind, spinnerClassName, children, className, isLoading, disabled,
        ...other } = this.props;

        return (
            <button
                className = {Button.getClasses(this.props)}
                disabled = {this.props.disabled || this.props.isLoading}

                {...Button.getEventsBinding(this)}
                {...other}
            >
                {this.props.isLoading ? Button.getSpinner(this.props) : this.props.children}
            </button>
        );
    }
}

Button.displayName = 'Button';

Button.propTypes = _.assign(
    {},
    {
        'aria-label': isRequiredIf(
            PropTypes.string, (props) => Button.isIconButton(props)
        ),
        kind: PropTypes.oneOf(kinds),
        children: PropTypes.any,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        spinnerClassName: PropTypes.string,
        isLoading: PropTypes.bool,
        name: PropTypes.string.isRequired,
        size: PropTypes.oneOf(buttonSizes),
        type: PropTypes.oneOf(buttonTypes)
    },
    _.fromPairs(_.map(
        buttonEventNames, eventName => [eventName, PropTypes.func]
    ))
);

Button.defaultProps = _.assign(
    {},
    {
        className: '',
        disabled: false,
        isLoading: false,
        type: _.first(buttonTypes)
    },
    _.fromPairs(_.map(buttonEventNames, eventName => [eventName, _.noop]))
);

Button.getClasses = (props) => {
    const prefix = 'dd';
    const block = `${prefix}-${Button.displayName.toLowerCase()}`;
    const styleMod = props.kind && `${block}--${props.kind}`;
    const sizeMod = props.size && `${block}--${props.size}`;
    const iconMod = props.size && `${block}--icon`;
    const disabledMod = `${block}--disabled`;
    const loadingMod = `${block}--loading`;
    const extraClasses = props.className.split(' ');

    return cx(
        _.assign(
            {},
            { [block]: true },
            { [styleMod]: !!styleMod },
            { [sizeMod]: !!sizeMod },
            { [iconMod]: Button.isIconButton(props) },
            { [disabledMod]: props.disabled },
            { [loadingMod]: props.isLoading },
            _.fromPairs(_.map(
                extraClasses, className => [className, true]
            ))
        )
    );
};

Button.getSpinner = (properties) => {
    const { Spinner } = require('../index');
    return <Spinner className={properties.spinnerClassName} />;
};

Button.getEventsBinding = (context) => _.fromPairs(
    _.map(buttonEventNames, (eventName) => [
        eventName, context.props[eventName].bind(context)
    ])
);

Button.isIconButton = (props) => {
    const { Icon } = require('../index');
    return hasChild(props.children, Icon) && React.Children.count(props.children) === 1;
};

export default Button;
