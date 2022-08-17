import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from '../../components/Input/Input'

export default {
  component: Input,
  title: 'Input',
} as ComponentMeta<typeof Input>

const InputTemplate: ComponentStory<typeof Input> = (props) => <Input {...props} />

export const Default = InputTemplate.bind({})
Default.args = {
  type: 'text',
  label: 'Name',
}

export const Pinned = InputTemplate.bind({})
Pinned.args = {
  ...Default.args.task,
}

export const Archived = InputTemplate.bind({})
Archived.args = {
  ...Default.args.task,
}
