import { defineConfig } from 'cypress'
import { initPlugin } from 'cypress-plugin-snapshots/plugin'
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-dev-shm-usage')
        }
        return launchOptions
      })
      addMatchImageSnapshotPlugin(on, config)
      initPlugin(on, config)
      return config
    },
  },
})
