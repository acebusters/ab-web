import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { setAuthState } from '../AccountProvider/actions';
import { makeSelectLoggedIn } from '../AccountProvider/selectors';

import TableMenu from '../../components/TableMenu';

const mapDispatchToProps = (dispatch) => ({
  handleClickLogout: () => {
    browserHistory.push('/login');
    return dispatch(setAuthState({ loggedIn: false }));
  },
});

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableMenu);
