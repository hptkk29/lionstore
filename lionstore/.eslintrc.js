module.exports = {
    rules: {
      'no-unused-vars': ['warn', { 'varsIgnorePattern': '^_' }],
      '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^_' }],
    },
    env: {
      commonjs: true,
      jquery: true
    },
};