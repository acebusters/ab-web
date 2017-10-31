import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFishWarned } from 'containers/Dashboard/actions';
import { modalDismiss } from 'containers/App/actions';

import SubmitButton from 'components/SubmitButton';
import H2 from 'components/H2';

const FishWarningDialog = (props) => {
  const handleAcceptClick = () => {
    props.setFishWarned();
    props.modalDismiss();
    props.showDepositDialog();
  };
  return (
    <div>
      <H2>Warning!</H2>
      <span>Account limit 0.1 ETH. Higher deposits will be rejected.</span>
      <br />
      <br />
      <SubmitButton type="button" onClick={handleAcceptClick}>
        Accept
      </SubmitButton>
    </div>
  );
};
FishWarningDialog.propTypes = {
  setFishWarned: PropTypes.func.isRequired,
  modalDismiss: PropTypes.func.isRequired,
  showDepositDialog: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  setFishWarned,
  modalDismiss,
})(FishWarningDialog);
