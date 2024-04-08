import { StyleSheet } from 'react-native';
import { extendTheme } from 'src/Themes';

export const a = ({ colors }: extendTheme) =>
	StyleSheet.create({
		main: {
			backgroundColor: 'red',
			height: 20,
		},
	});
