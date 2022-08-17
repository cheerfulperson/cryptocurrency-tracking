import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Avatar from '../../components/Avatar/Avatar'
import avatar from '../../assets/avatar.png'

export default {
  component: Avatar,
  title: 'Avatar',
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof Avatar>

const ListTemplate: ComponentStory<typeof Avatar> = (props) => <Avatar {...props} />
let rotate = 1

export const Default = ListTemplate.bind({})
Default.args = {
  src: avatar,
  onClick: (e) => {
    rotate += 1
    const target = e.target as HTMLElement
    target.style.transform = `rotate(${rotate * 60}deg)`
  },
}

export const Pinned = ListTemplate.bind({})
Pinned.args = {
  ...Default.args,
  styles: {
    border: '10px solid black',
  },
}

export const Archived = ListTemplate.bind({})
Archived.args = {
  ...Default.args,
}
