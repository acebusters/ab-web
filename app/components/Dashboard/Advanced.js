import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';
import Button from 'components/Button';
import H2 from 'components/H2';

import {
  Pane,
  Section,
  Text,
  SendContainer as ButtonGroup,
  TabIcon as ModeIcon,
} from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class Advanced extends React.Component {
  static propTypes = {
    onImport: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }
  render() {
    const { onImport, onExport, onReset } = this.props;
    return (
      <Pane name="dashboard-advanced">
        <Section>
          <H2><ModeIcon className="fa fa-suitcase" />Account Recovery</H2>
          <Text>These functions import and export the wallet seed from/to localstorage. Please be careful as this operation can cause loss of funds.</Text>
          <Alert theme="warning" style={{ textAlign: 'center' }}>
            Warning: Testnet ETH and NTZ only!
          </Alert>
          <ButtonGroup>
            <Button
              icon="fa fa-download"
              size="medium"
              onClick={onImport}
            >
              Import Wallet
            </Button>
            <Button
              icon="fa fa-upload"
              size="medium"
              onClick={onExport}
            >
              Export Wallet
            </Button>
          </ButtonGroup>
        </Section>
        <Section>
          <H2><ModeIcon className="fa fa-trash" />Account Reset</H2>
          <Text>This function will generate a new account. A previous account can be recovered using the &#39;Account Recovery: Import Wallet&#39; tool.</Text>
          <Button
            icon="fa fa-exclamation-triangle"
            size="medium"
            onClick={onReset}
          >
            Reset Account
          </Button>
        </Section>
      </Pane>
    );
  }
}

export default Advanced;
