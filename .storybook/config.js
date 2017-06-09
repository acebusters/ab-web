import { configure } from '@storybook/react';

function loadStories() {
  require('../app/components/TableMenu/stories');
  require('../app/components/ActionBar/stories');
}

configure(loadStories, module);
