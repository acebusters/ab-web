import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import H2 from '../H2';

import { SectionOverview } from './styles';
import LinkInput from './LinkInput';

const refLink = ({ id }) => `${window.location.origin}/register/ref/${id}`;

function Refs({ messages, refs }) {
  return (
    <SectionOverview
      name="refs"
      style={{
        alignItems: 'center',
      }}
    >
      <H2><FormattedMessage {...messages.refs} values={{ refsCount: refs.length }} /></H2>
      <p style={{ textAlign: 'center', margin: '-10px 0 20px' }}>
        Share your personal link and get up to 5%<br />of the deposit your referals bring in (coming soon)
      </p>

      <LinkInput link={refLink(refs[0])} />

      <p>
        <FormattedMessage
          {...messages.invitationsLeft}
          values={{ allowance: refs[0].allowance }}
        />
      </p>
    </SectionOverview>
  );
}

Refs.propTypes = {
  messages: PropTypes.object,
  refs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    allowance: PropTypes.number,
  })),
};

export default Refs;
