import { createSelector } from 'reselect';

function selectDashboard(state) {
  return state.get('dashboard');
}

export const createDashboardTxsSelector = () => createSelector(
  selectDashboard,
  (dashboard) => ({
    pending: dashboard.get('pending').toJS(),
    dashboardEvents: dashboard.get('events') && dashboard.get('events').toList().toJS(),
    pendingSell: dashboard.get('pendingSell').toJS(),
  }),
);
