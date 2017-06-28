import { createSelector } from 'reselect';

function selectDashboard(state) {
  return state.get('dashboard');
}

export const createDashboardTxsSelector = () => createSelector(
  selectDashboard,
  (dashboard) => ({
    txError: dashboard.getIn(['failedTx', 'error']),
    failedTxAction: dashboard.hasIn(['failedTx', 'action']) ? dashboard.getIn(['failedTx', 'action']).toJS() : null,
    dashboardEvents: dashboard.get('events') && dashboard.get('events').toList().toJS(),
    pendingSell: dashboard.get('pendingSell').toJS(),
  }),
);
