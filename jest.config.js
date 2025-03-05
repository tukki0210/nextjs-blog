module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // CSS/SCSSモジュールのモック
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // 画像やフォントなどのファイルのモック
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  // テスト対象から除外するディレクトリ
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  // テスト実行前に実行するセットアップファイル
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // トランスフォーム対象のファイル
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
    }],
  },
  // モジュール解決のためのパス設定
  moduleDirectories: ['node_modules', '<rootDir>'],
};
