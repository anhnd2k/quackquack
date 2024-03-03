import { Text, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { extendTheme, useThemeContext } from 'src/Themes';
import dimens from 'src/constants/dimens';

const Home = ({ style }: { style: ViewStyle }) => {
	const colors: extendTheme = useTheme() as extendTheme;
	const styles = makeStyles(colors);
	const setThemeMode = useThemeContext();
	return (
		<Animated.View style={[{ ...style, marginTop: dimens.statusBarHeight }, styles.component]}>
			<TouchableOpacity
				onPress={() => setThemeMode.setMode(setThemeMode.mode === 'light' ? 'dark' : 'light')}
			>
				<Text style={styles.text}>sadfdsafdsaHome</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

const makeStyles = ({ colors }: extendTheme) =>
	StyleSheet.create({
		component: {
			padding: 10,
		},
		text: {
			color: colors.white,
		},
	});
export default Home;
