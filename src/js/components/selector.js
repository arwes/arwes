const _ = require('lodash');
const React = require('react');
const Box = require('./box');

const Selector = React.createClass({

  getDefaultProps () {
    return {
      onChange: null,
      options: []
    };
  },

  render () {

    const props = this.props;

    const list = props.options.map(opt => {
      if (opt.selected) return;
      return (
        <li key={opt.id} data-id={opt.id} className='pr-selector__item'
        onClick={this.onSelect}>
          <i className={`mdi mdi-${opt.icon}`} /> {opt.name}
        </li>
      );
    });

    const selectedOpt = _(props.options).find(opt => opt.selected);

    const selected = selectedOpt ?
      <span><i className={`mdi mdi-${selectedOpt.icon}`} /> {selectedOpt.name}</span> :
      '';

    return (
      <div className='pr-selector' ref={el => this._el = el}>
        <Box small={true}>
          <div className='pr-selector__frame' onClick={this.onToggle}>
            {selected}
          </div>
          <ul className='pr-selector__list'>
            {list}
          </ul>
        </Box>
      </div>
    );
  },

  onToggle () {
    if (this._el.className.indexOf('shown') >= 0) {
      this._el.className = 'pr-selector';
    } else {
      this._el.className = 'pr-selector pr-selector_shown';
    }
  },

  onSelect (e) {
    const id = e.target.getAttribute('data-id');
    if (this.props.onChange) this.props.onChange(e, id);
    this.onToggle();
  }
});

module.exports = Selector;
