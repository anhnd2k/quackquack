import { StyleSheet, View, Text, TextStyle, StyleProp, TouchableOpacity } from 'react-native';
import React from 'react';
import { extendTheme } from 'src/Themes';
import { useTheme } from '@react-navigation/native';
import dimens from 'src/constants/dimens';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Setting from '../Setting';
import Analytic from '../Analytic';

const Tab = createBottomTabNavigator();

const tabBarOptions = (
	data: any,
	styleUnfocus: StyleProp<TextStyle>,
	styleFocus: StyleProp<TextStyle>,
	title: string
) => {
	return (
		<View>
			<Text style={data.focused ? styleFocus : styleUnfocus}>{title}</Text>
		</View>
	);
};

const HomeCustom = ({ children, onPress }: BottomTabBarButtonProps) => (
	<TouchableOpacity style={{ top: -20 }} onPress={onPress}>
		<View
			style={{
				width: 70,
				height: 70,
				borderRadius: 35,
				backgroundColor: '#fff',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View style={{ width: 60, height: 60, backgroundColor: 'red', borderRadius: 30 }}>
				{children}
			</View>
		</View>
	</TouchableOpacity>
);

const Main = () => {
	const theme: extendTheme = useTheme() as extendTheme;
	const styles = makeStyles(theme);
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: styles.bottomTab,
				tabBarShowLabel: false,
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: (dataRef) =>
						tabBarOptions(dataRef, styles.textUnfocus, styles.textFocus, 'Analytic'),
				}}
				name="Analytic"
				component={Analytic}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: (dataRef) =>
						tabBarOptions(dataRef, styles.textUnfocus, styles.textFocus, 'Home'),
					tabBarButton: (props) => <HomeCustom {...props} />,
				}}
				name="Home"
				component={Home}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: (dataRef) =>
						tabBarOptions(dataRef, styles.textUnfocus, styles.textFocus, 'Setting'),
				}}
				name="Settings"
				component={Setting}
			/>
		</Tab.Navigator>
	);
};

export default Main;

const makeStyles = ({ colors }: extendTheme) =>
	StyleSheet.create({
		component: {
			marginTop: dimens.statusBarHeight,
			padding: 10,
			backgroundColor: colors.background,
		},
		textFocus: {
			color: colors.black,
		},
		textUnfocus: {
			color: colors.error,
		},
		bottomTab: {
			position: 'absolute',
			bottom: 25,
			left: 20,
			right: 20,
			elevation: 0,
			backgroundColor: colors.white,
			height: 90,
			borderRadius: 15,
		},
	});
