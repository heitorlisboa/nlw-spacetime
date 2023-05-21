import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import { useCallback } from 'react';
import {
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import bgBlur from './src/assets/bg-blur.png';
import NlwLogo from './src/assets/nlw-spacetime-logo.svg';
import Stripes from './src/assets/stripes.svg';

SplashScreen.preventAutoHideAsync();

const StyledStripes = styled(Stripes);

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />

      <ImageBackground
        source={bgBlur}
        className="relative flex-1 items-center justify-center bg-zinc-950 px-8"
        imageStyle={{ position: 'absolute', left: '-100%' }}
        onLayout={onLayoutRootView}
      >
        <StyledStripes className="absolute left-1" />
        <View className="items-center gap-y-6">
          <NlwLogo />
          <View>
            <Text className="text-center font-title text-2xl text-gray-50">
              Sua cápsula do tempo
            </Text>
            <Text className="mt-2 text-center font-body text-base text-gray-100">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-full bg-green-500 px-5 py-2"
            activeOpacity={0.7}
          >
            <Text className="font-alt text-sm uppercase text-black">
              Começar a cadastrar
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="absolute bottom-10 text-sm text-gray-200">
          Feito com 💜 no NLW da{' '}
          <Text
            className="underline"
            accessibilityRole="link"
            onPress={() => Linking.openURL('https://rocketseat.com.br')}
          >
            Rocketseat
          </Text>
        </Text>
      </ImageBackground>
    </>
  );
}
