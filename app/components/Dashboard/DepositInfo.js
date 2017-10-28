import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import QRCode from 'qrcode.react';
import ethUtil from 'ethereumjs-util';
import makeSelectAccountData from 'containers/AccountProvider/selectors';
import { FISH_WARNING_DIALOG } from 'containers/Modal/constants';
import { modalAdd, modalDismiss } from 'containers/App/actions';
import { createIsFishWarnedSelector } from 'containers/Dashboard/selectors';
import { setFishWarned } from 'containers/Dashboard/actions';
import Alert from '../Alert';
import Button from '../Button';
import WithLoading from '../WithLoading';

import { Address } from './styles';
/* eslint-disable react/prefer-stateless-function */
class DepositInfo extends React.Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    isFishWarned: PropTypes.bool.isRequired,
    setFishWarned: PropTypes.func.isRequired,
    modalAdd: PropTypes.func.isRequired,
    modalDismiss: PropTypes.func.isRequired,
  };

  render() {
    const { account, isFishWarned } = this.props;
    const qrUrl = `ether:${account.proxy}`;
    const qrStyles = isFishWarned
      ? { margin: 'auto' }
    : { margin: 'auto', filter: 'blur(4px)', opacity: '.5' };
    const handleClick = () => this.props.modalAdd({
      modalType: FISH_WARNING_DIALOG,
      modalProps: {
        onSuccessButtonClick: () => {
          this.props.modalDismiss();
          this.props.setFishWarned();
        },
      },
    });
    return (
      <div>
        <WithLoading
          isLoading={!account.proxy || account.proxy === '0x'}
          loadingSize="40px"
          styles={{
            outer: qrStyles,
          }}
        >
          <QRCode value={qrUrl} size={100} />
          <Alert style={qrStyles} theme="success">
            <Address style={{ width: 180 }}>
              {ethUtil.toChecksumAddress(account.proxy)}
            </Address>
          </Alert>
        </WithLoading>
        {!isFishWarned &&
          <Button
            style={{ position: 'relative', top: -120 }}
            onClick={handleClick}
            size="medium"
          >
            Deposit
          </Button>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccountData(),
  isFishWarned: createIsFishWarnedSelector(),
});

export default connect(
  mapStateToProps,
  { modalAdd, modalDismiss, setFishWarned },
)(DepositInfo);
