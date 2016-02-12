import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import isRequiredIf from 'react-proptype-conditional-require';

const textInputEventNames = [
    'onClick',
    'onChange',
    'onTouchStart',
    'onTouchEnd',
    'onTouchCancel',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onFocus',
    'onBlur'
];

const textInputTypes = [
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

class TextInput extends Component {

    constructor(properties) {
        super(properties);
    }

    render() {
        const { defaultValue, children, className, id, value,
        ...other } = this.props;
        return (
            <input
                className={TextInput.getClasses(this.props)}
                ref={_.camelCase(TextInput.displayName)}
                id={this.props.name}
                value={this.props.valueFormatter(this.props.value)}
                aria-required={this.props.required}
                aria-readonly={this.props.readOnly}
                {...other}
                {...TextInput.getEventsBinding(this)}
            />
        );
    }
}

TextInput.displayName = 'TextInput';

TextInput.propTypes = _.assign(
    {},
    {
        'aria-required': isRequiredIf(
            PropTypes.string, (props) => !!props.required
        ),
        'aria-readonly': isRequiredIf(
            PropTypes.string, (props) => !!props.readOnly
        ),

        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        type: React.PropTypes.oneOf(textInputTypes),
        className: React.PropTypes.string,
        required: React.PropTypes.bool
    },
    _.fromPairs(_.map(
        textInputEventNames, eventName => [eventName, PropTypes.func]
    ))
);

TextInput.defaultProps = _.assign(
    {},
    {
        className: '',
        type: _.first(textInputTypes),
        valueFormatter: value => value
    },
    _.fromPairs(_.map(textInputEventNames, eventName => [eventName, _.noop]))
);

TextInput.getEventsBinding = (context) => _.fromPairs(
    _.map(textInputEventNames, (eventName) => [
        eventName, context.props[eventName].bind(context)
    ])
);

TextInput.getClasses = (props) => {
    const prefix = 'dd';
    const block = `${prefix}-${TextInput.displayName.toLowerCase()}`;
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

export default TextInput;
