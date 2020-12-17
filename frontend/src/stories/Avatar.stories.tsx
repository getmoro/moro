import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Avatar, Props } from 'components/Avatar';
import { sampleUser } from '__mocks__/sampleData/sampleUser';

export default {
  title: 'Example/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<Props> = (args) => <Avatar {...args} />;

export const WithContent = Template.bind({});
WithContent.args = {
  image: sampleUser.avatar,
};
