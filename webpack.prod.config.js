module.exports = {
  mode: 'production',
  optimization: { splitChunks: { chunks: 'all' } },
  performance: {
    hints: false,
    maxAssetSize: 512000
}
}
