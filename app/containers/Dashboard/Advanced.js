import web3Connect from 'containers/AccountProvider/web3Connect';
import { CONFIRM_DIALOG, IMPORT_DIALOG, EXPORT_DIALOG } from 'containers/Modal/constants';
import { modalAdd, modalDismiss } from 'containers/App/actions';

import Advanced from 'components/Dashboard/Advanced';
import { setAuthState } from '../AccountProvider/actions';

const mapDispatchToProps = (dispatch) => ({
  onImport: () => modalAdd({ modalType: IMPORT_DIALOG }),
  onExport: () => modalAdd({ modalType: EXPORT_DIALOG }),
  onReset: () => modalAdd({
    modalType: CONFIRM_DIALOG,
    modalProps: {
      msg: 'This will remove your account information from localstorage and then create a new account with a different wallet private key. If you want to save your existing wallet (testnet coins only), please backup your account with the Advanced > Account Recover > Export Wallet tool',
      onSubmit: () => {
        dispatch(modalDismiss());
        dispatch(setAuthState({ loggedIn: false }));
      },
      buttonText: 'Reset',
    },
  }),
});

export default web3Connect(
  () => {},
  mapDispatchToProps,
)(Advanced);
