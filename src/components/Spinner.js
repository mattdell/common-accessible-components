import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';

export default class Spinner extends Component {

	static displayName = 'Spinner';

    static propTypes = {
        className: PropTypes.string
    };

    static getClasses(props) {
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
    }

    render() {
        return <span className={Spinner.getClasses(this.props)}></span>;
    }
}
