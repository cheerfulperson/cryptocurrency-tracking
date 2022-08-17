import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../../components/Button/Button'

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>

const ButtonTemplate: ComponentStory<typeof Button> = (props) => <Button {...props} />

export const Default = ButtonTemplate.bind({})
Default.args = {
  type: 'free',
  children: <span>button</span>,
  styles: {
    color: 'black',
    background: 'white',
  },
}

export const Pinned = ButtonTemplate.bind({})
Pinned.args = {
  ...Default.args.task,
  type: 'custom',
  children: <span>button</span>,
}

export const Archived = ButtonTemplate.bind({})
Archived.args = {
  ...Default.args.task,
  type: 'free',
  children: <span>button</span>,
}
