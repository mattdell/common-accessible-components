import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import isRequiredIf from 'react-proptype-conditional-require';

const inputEventNames = [
    'onClick',
    'onChange',
    'onKeyPress',
    'onKeyDown',
    'onKeyUp',
    'onTouchStart',
    'onTouchEnd',
    'onTouchCancel',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onFocus',
    'onBlur'
];

const inputTypes = [
    'text',
    'time',
    'hidden',
    'email',
    'date',
    'number',
    'search',
    'tel',
    'url',
    'password'
];

class Input extends Component {

    constructor(properties) {
        super(properties);
    }

    render() {
        const { children, className, id,
        ...other } = this.props;
        return (
            <input
                className={Input.getClasses(this.props)}
                ref={_.camelCase(Input.displayName)}
                id={this.props.name}
                aria-required={this.props.required}
                aria-readonly={this.props.readOnly}
                {...other}
                {...Input.getEventsBinding(this)}
            />
        );
    }
}

Input.displayName = 'Input';

Input.propTypes = _.assign(
    {},
    {
        'aria-required': isRequiredIf(
            PropTypes.string, (props) => !!props.required
        ),
        'aria-readonly': isRequiredIf(
            PropTypes.string, (props) => !!props.readOnly
        ),
        defaultValue: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        type: React.PropTypes.oneOf(inputTypes),
        className: React.PropTypes.string,
        required: React.PropTypes.bool
    },
    _.fromPairs(_.map(
        inputEventNames, eventName => [eventName, PropTypes.func]
    ))
);

Input.defaultProps = _.assign(
    {},
    {
        className: '',
        type: _.first(inputTypes)
    },
    _.fromPairs(_.map(inputEventNames, eventName => [eventName, _.noop]))
);

Input.getEventsBinding = (context) => _.fromPairs(
    _.map(inputEventNames, (eventName) => [
        eventName, context.props[eventName].bind(context)
    ])
);

Input.getClasses = (props) => {
    const prefix = 'dd';
    const block = `${prefix}-${Input.displayName.toLowerCase()}`;
    const disabledMod = `${block}--disabled`;
    const requiredMod = `${block}--required`;
    const readonlyMod = `${block}--readonly`;
    const typeMod = `${block}--${props.type}`;
    const extraClasses = props.className.split(' ');

    return cx(
        _.assign(
            {},
            { [block]: true },
            { [disabledMod]: props.disabled },
            { [requiredMod]: !!props.required },
            { [readonlyMod]: !!props.readOnly },
            { [typeMod]: props.type !== 'text' ? !!props.type : false },
            _.fromPairs(_.map(
                extraClasses, className => [className, true]
            ))
        )
    );
};

export default Input;
