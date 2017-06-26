import { createSelector } from 'reselect';

function selectDashboard(state) {
  return state.get('dashboard');
}

export const createDashboardTxsSelector = () => createSelector(
  selectDashboard,
  (dashboard) => ({
    pending: dashboard.get('pending').toJS(),
    pendingSell: dashboard.get('pendingSell').toJS(),
  }),
);
