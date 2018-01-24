import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeBlockySelector,
  makeNickNameSelector,
  makeSelectLoggedIn,
  makeSelectGenerated,
} from '../AccountProvider/selectors';
import { setAuthState } from '../AccountProvider/actions';
import { modalAdd } from '../App/actions';
import { IMPORT_DIALOG, EXPORT_DIALOG } from '../Modal/constants';

import Header from '../../components/Header';

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(setAuthState({ loggedIn: false })),
  onImport: () => dispatch(modalAdd({ modalType: IMPORT_DIALOG })),
  onExport: () => dispatch(modalAdd({ modalType: EXPORT_DIALOG })),
});

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  nickName: makeNickNameSelector(),
  blocky: makeBlockySelector(),
  accountIsGenerated: makeSelectGenerated(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
