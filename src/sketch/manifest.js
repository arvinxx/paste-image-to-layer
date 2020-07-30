const name = 'Paste Image To Shape Layer';

module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  name,
  homepage:
    'https://github.com/arvinxx/sketch-plugin-skpm-umi-typescript-example',
  identifier:
    process.env.NODE_ENV === 'development'
      ? 'paste-image-to-layer.dev'
      : 'paste-image-to-layer',

  icon: 'icons/logo.png',
  commands: [
    {
      name: 'Paste Image To Layer',
      identifier: 'paste-image-to-layer.paset',
      script: './app.ts',
      handler: 'pasteToImage',
    },
  ],
  menu: {
    title: name,
    items: ['paste-image-to-layer.paset'],
  },
};
