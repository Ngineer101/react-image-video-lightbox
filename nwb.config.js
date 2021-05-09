module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'react-image-video-lightbox',
      externals: {
        react: 'React'
      }
    }
  }
}
