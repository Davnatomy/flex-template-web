import React, { Component } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import css from './SelectSingleFilterPlain.css';

class SelectSingleFilterPlain extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.selectOption = this.selectOption.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  selectOption(option, e) {
    const { urlParam, onSelect } = this.props;
    onSelect(urlParam, option);

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  toggleIsOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      rootClassName,
      className,
      label,
      options,
      initialValue,
      twoColumns,
      useBullets,
    } = this.props;

    const labelClass = initialValue ? css.filterLabelSelected : css.filterLabel;

    const hasBullets = useBullets || twoColumns;
    const optionsContainerClass = classNames({
      [css.optionsContainerOpen]: this.state.isOpen,
      [css.optionsContainerClosed]: !this.state.isOpen,
      [css.hasBullets]: hasBullets,
      [css.twoColumns]: twoColumns,
    });

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{label}</span>
          </button>
          <button className={css.clearButton} onClick={e => this.selectOption(null, e)}>
            <FormattedMessage id={'SelectSingleFilterPlain.clear'} />
          </button>
        </div>
        <div className={optionsContainerClass}>
          {options.map(option => {
            // check if this option is selected
            const selected = initialValue === option.key;
            const optionClass = hasBullets && selected ? css.optionSelected : css.option;
            // menu item selected bullet or border class
            const optionBorderClass = hasBullets
              ? classNames({
                  [css.optionBulletSelected]: selected,
                  [css.optionBullet]: !selected,
                })
              : classNames({
                  [css.optionBorderSelected]: selected,
                  [css.optionBorder]: !selected,
                });
            return (
              <button
                key={option.key}
                className={optionClass}
                onClick={() => this.selectOption(option.key)}
              >
                <span className={optionBorderClass} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

SelectSingleFilterPlain.defaultProps = {
  rootClassName: null,
  className: null,
  initialValue: null,
  twoColumns: false,
  useBullets: false,
};

SelectSingleFilterPlain.propTypes = {
  rootClassName: string,
  className: string,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,

  options: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  initialValue: string,
  twoColumns: bool,
  useBullets: bool,
};

export default SelectSingleFilterPlain;
