import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeBlockySelector,
  makeNickNameSelector,
  makeSelectLoggedIn,
  makeSelectGenerated,
} from '../AccountProvider/selectors';
import { setAuthState } from '../AccountProvider/actions';

import Header from '../../components/Header';

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(setAuthState({ loggedIn: false })),
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
