module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            hooks: './src/hooks',
            components: './src/components',
            stores: './src/stores',
            utils: './src/utils',
            models: './src/models',
            defaultSettings: './src/defaultSettings',
          },
        },
      ],
    ],
  };
};
