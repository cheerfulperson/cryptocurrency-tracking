import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Spinner from '../../components/Spinner/Spinner'

export default {
  component: Spinner,
  title: 'Spinner',
} as ComponentMeta<typeof Spinner>

const SpinnerTemplate: ComponentStory<typeof Spinner> = (props) => <Spinner {...props} />

export const Default = SpinnerTemplate.bind({})
Default.args = {

}

export const Pinned = SpinnerTemplate.bind({})
Pinned.args = {
  ...Default.args,
}

export const Archived = SpinnerTemplate.bind({})
Archived.args = {
  ...Default.args,
}
