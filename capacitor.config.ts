import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.asuransiku.id',
  appName: 'ASURANSIKU.id',
  webDir: 'www/asuransiku-id-pro-v2',
  server: {
    androidScheme: 'https',
    url: 'https://dev.asuransiku.id/asuransiku-id-pro-beta-dua/'
  },
  backgroundColor: '#3171e0'
};

export default config;
