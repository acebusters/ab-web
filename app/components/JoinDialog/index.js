import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'redux-form/immutable';
import SubmitButton from 'components/SubmitButton';
import RangeSlider from 'components/Slider/RangeSlider';
import Web3Alerts from 'containers/Web3Alerts';
import EstimateWarning from 'containers/EstimateWarning';
import messages from 'containers/JoinDialog/messages';
import RebuyDialog from 'components/RebuyDialog';

import { formatNtz } from '../../utils/amountFormatter';

import { ButtonContainer } from './styles';

export class JoinDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    return this.props.onJoin(values.get('amount'));
  }

  render() {
    const {
      sb,
      canSendTx,
      balance,
      handleSubmit,
      estimate,
      amount,
      submitting,
      onLeave,
      rebuy,
    } = this.props;

    const min = sb * 40;
    const tableMax = sb * 200;
    const max = (balance < tableMax) ? balance - (balance % sb) : tableMax;
    if (balance < min) {
      return <RebuyDialog messages={messages} {...this.props} />;
    }
    return (
      <Form style={{ maxWidth: '30em' }} onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          component={RangeSlider}
          name="amount"
          min={min}
          max={max}
          step={sb}
        />
        <div><FormattedMessage {...messages.max} /> {formatNtz(max)} NTZ</div>
        <div>{formatNtz(amount)} NTZ</div>

        <Web3Alerts />

        {canSendTx &&
          <EstimateWarning
            estimate={estimate}
            args={[amount]}
          />
        }

        <ButtonContainer>
          <SubmitButton
            disabled={!canSendTx}
            submitting={submitting}
          >
            <FormattedMessage {...(rebuy ? messages.rebuy : messages.join)} />
          </SubmitButton>
          {rebuy && onLeave &&
            <SubmitButton type="button" onClick={onLeave}>
              <FormattedMessage {...messages.leave} />
            </SubmitButton>
          }
        </ButtonContainer>
      </Form>
    );
  }
}
JoinDialog.propTypes = {
  onJoin: PropTypes.func,
  onLeave: PropTypes.func,
  rebuy: PropTypes.bool,
  handleSubmit: PropTypes.func,
  estimate: PropTypes.func,
  canSendTx: PropTypes.bool,
  sb: PropTypes.number,
  submitting: PropTypes.bool,
  amount: PropTypes.number,
  balance: React.PropTypes.number,
};

export default JoinDialog;
