import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from 'grid-styled';
import styled from 'styled-components';
import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

import {
  baseColor,
} from '../../variables';

const StyledIcon = styled.i`
  font-size: 5em !important;
  color: ${baseColor}
  padding: 0.1em;
`;

const IconContainer = styled.div`
    margin-left: -20px;
`;

function Footer() {
  return (
    <Wrapper>
      <Grid xs={1 / 3}>
        <LocaleToggle />
      </Grid>
      <Grid xs={1 / 3}>
        <Grid xs={1 / 4}>
          <a href="https://github.com/acebusters" target="_blank"><StyledIcon className="fa fa-github"></StyledIcon></a>
        </Grid>
        <Grid xs={1 / 4}>
          <IconContainer>
            <a href="https://github.com/acebusters" target="_blank"><StyledIcon className="fa icon-discord"></StyledIcon></a>
          </IconContainer>
        </Grid>
        <Grid xs={1 / 4}>
          <a href="https://twitter.com/ace_busters" target="_blank"><StyledIcon className="fa fa-twitter" ></StyledIcon></a>
        </Grid>
        <Grid xs={1 / 4}>
          <a href="https://www.facebook.com/acebusters.poker" target="_blank"><StyledIcon className="fa fa-facebook"></StyledIcon></a>
        </Grid>
      </Grid>
      <Grid xs={1 / 3}>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://twitter.com/Ace_Busters">Acebusters</A>,
          }}
        />
      </Grid>
    </Wrapper>
  );
}

export default Footer;
