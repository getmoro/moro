import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Avatar, Props } from '../components/Avatar';
import { sampleUser } from '../__mocks__/sampleData/sampleUser';

export default {
  title: 'Example/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<Props> = (args) => <Avatar {...args} />;

export const WithContent = Template.bind({});
WithContent.args = {
  image: sampleUser.avatar,
};
