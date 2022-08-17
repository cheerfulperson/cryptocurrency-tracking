import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import List from '../../components/List/List'
import ListItem from '../../components/ListItem/ListItem'

export default {
  component: List,
  title: 'List',
} as ComponentMeta<typeof List>

const ListTemplate: ComponentStory<typeof List> = (props) => <List {...props} />

export const Default = ListTemplate.bind({})
Default.args = {
  children: Array.from({ length: 10 }).map((el, i) => (
    <ListItem key={i}>
      <span>{i}</span>
    </ListItem>
  )),
  styles: {
    flexDirection: 'column',
  },
}

export const Pinned = ListTemplate.bind({})
Pinned.args = {
  ...Default.args,
  styles: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
}

export const Archived = ListTemplate.bind({})
Archived.args = {
  ...Default.args,
}
