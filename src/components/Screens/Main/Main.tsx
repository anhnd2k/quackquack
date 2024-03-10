import {
	StyleSheet,
	View,
	Text,
	TextStyle,
	StyleProp,
	TouchableOpacity,
	GestureResponderEvent,
} from 'react-native';
import React from 'react';
import { extendTheme } from 'src/Themes';
import { useTheme } from '@react-navigation/native';
import dimens from 'src/constants/dimens';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Setting from '../Setting';
import Analytic from '../Analytic';
import navigationService from 'src/navigation/navigationService';
import { navigationRoutes } from 'src/navigation/StackNavigation';
import DialogAlert from 'src/components/base/DialogAlert';
import { useDispatch } from 'react-redux';
import { PayLoadEmoji, setDailiEmoji } from 'src/reduxStore/actions/emoji';
import { currentDayUnix } from 'src/constants/Times';

const Tab = createBottomTabNavigator();

interface Emoji {
	id: number;
	name: string;
	gif: string;
}

const ListEmoji: Emoji[] = [
	{ id: 1, name: 'Very Happy', gif: '' },
	{ id: 2, name: 'Happy', gif: '' },
	{ id: 3, name: 'Normal', gif: '' },
	{ id: 4, name: 'Sad', gif: '' },
	{ id: 5, name: 'Very Sad', gif: '' },
	{ id: 6, name: 'Cry', gif: '' },
];

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

const withEmojiMain = dimens.deviceWidth * 0.7;

const HomeCustom = ({ children, onPress }: BottomTabBarButtonProps) => {
	const currentRouterName = navigationService.getCurrentRouteName();
	const isHomePlan = navigationRoutes.HOME === currentRouterName;
	const dispatch = useDispatch();

	const setEmojiDaily = (idEmoji: number) => {
		const payloadEmoji: PayLoadEmoji = {
			idEmoji: idEmoji,
			idDay: currentDayUnix(),
		};
		dispatch(setDailiEmoji(payloadEmoji));
	};

	return (
		<TouchableOpacity
			activeOpacity={1}
			style={{ top: -20 }}
			onPress={(e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
				if (isHomePlan) {
					console.log('pick emoji');
					DialogAlert.showEmojiView(
						<View style={stylesOutSiteMain.modalPickEmoji}>
							<View style={stylesOutSiteMain.emojiBox}>
								{ListEmoji.map((item: Emoji, idx: number) => {
									return (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => setEmojiDaily(item.id)}
											key={idx}
											style={stylesOutSiteMain.itemEmoji}
										>
											<Text>{item.name}</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View>
					);
				} else {
					onPress(e);
				}
			}}
		>
			<View style={stylesOutSiteMain.homeComponent}>
				<View style={stylesOutSiteMain.homeStyle}>
					{/* {children} */}
					<Text>{isHomePlan ? 'Pick emoji' : navigationRoutes.HOME}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};
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
			initialRouteName="Home"
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

const stylesOutSiteMain = StyleSheet.create({
	homeStyle: {
		width: 60,
		height: 60,
		backgroundColor: 'red',
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	homeComponent: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalPickEmoji: { backgroundColor: 'red', marginBottom: 125, padding: 10, zIndex: 9999 },
	itemEmoji: {
		flexBasis: (withEmojiMain - 30) / 3,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		marginBottom: 10,
		marginHorizontal: 5,
		padding: 10,
	},
	emojiBox: { flexWrap: 'wrap', width: withEmojiMain, flexDirection: 'row' },
});

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
			bottom: 10,
			left: 10,
			right: 10,
			elevation: 0,
			backgroundColor: colors.white,
			height: 90,
			borderRadius: 15,
		},
	});
