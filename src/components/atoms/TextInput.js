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

        this.state = {
            value: !_.isUndefined(this.props.defaultValue) ? this.props.defaultValue : ''
        };
    }

    render() {
        const { group, defaultValue, children, className, id, valueFormatter, customValidator,
        ...other } = this.props;
        return (
            <input
                className={TextInput.getClasses(this.props)}
                ref={_.camelCase(TextInput.displayName)}
                id={this.props.name}
                value={this.state.value || ''}
                aria-required={this.props.required}
                aria-readonly={this.props.readOnly}
                {...other}
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

        group: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.required,
        defaultValue: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        type: React.PropTypes.oneOf(textInputTypes),
        className: React.PropTypes.string,
        valueFormatter: React.PropTypes.func,
        customValidator: React.PropTypes.func,
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

TextInput.getClasses = (props) => {
    const prefix = 'dd';
    const block = `${prefix}-${TextInput.displayName.toLowerCase()}`;
    const disabledMod = `${block}--disabled`;
    const requiredMod = `${block}--required`;
    const readonlyMod = `${block}--readonly`;
    const extraClasses = props.className.split(' ');

    return cx(
        _.assign(
            {},
            { [block]: true },
            { [disabledMod]: props.disabled },
            { [requiredMod]: !!props.required },
            { [readonlyMod]: !!props.readOnly },
            _.fromPairs(_.map(
                extraClasses, className => [className, true]
            ))
        )
    );
};

export default TextInput;
