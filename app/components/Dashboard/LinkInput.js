import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

import { CopyIcon } from './styles';

function copyLink(el) {
  el.select();

  try {
    document.execCommand('copy');
  } finally {
    el.setSelectionRange(0, 0);
  }
}

/* eslint-disable jsx-a11y/label-has-for */
function LinkInput({ link }) {
  return (
    <label style={{ position: 'relative' }}>
      <CopyIcon className="fa fa-copy" />
      <Input
        defaultValue={link}
        onClick={(e) => copyLink(e.currentTarget)}
        readOnly
        style={{ width: link.length * 9.5 }}
      />
    </label>
  );
}

LinkInput.propTypes = {
  link: PropTypes.string.isRequired,
};

export default LinkInput;
