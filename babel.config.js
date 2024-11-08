module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
          root: ['.'],
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@app": "./src",
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
