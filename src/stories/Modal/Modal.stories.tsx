import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Modal from '../../components/Modal/Modal'
import './Modal.scss'

export default {
  component: Modal,
  title: 'Modal',
} as ComponentMeta<typeof Modal>

const ModalTemplate: ComponentStory<typeof Modal> = (props) => <Modal {...props} />

export const Default = ModalTemplate.bind({})
Default.args = {
  isOpen: false,
  children: <h2>My Modal</h2>,
}

export const Pinned = ModalTemplate.bind({})
Pinned.args = {
  ...Default.args,
  containerClassName: 'content'
}

export const Archived = ModalTemplate.bind({})
Archived.args = {
  ...Default.args,
}
