import 'dotenv/config';
import { type ExpoConfig } from 'expo/config';

export default {
  name: 'mobile',
  slug: 'mobile',
  scheme: 'nlwspacetime',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    githubClientId: process.env.GITHUB_CLIENT_ID as string,
  },
} satisfies ExpoConfig;
