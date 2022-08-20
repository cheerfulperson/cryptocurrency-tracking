/* eslint-disable @typescript-eslint/no-namespace */
import 'cypress/react'
import 'cypress-plugin-snapshots/commands'
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

declare global {
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot: (obj: object) => void
    }
  }
}
