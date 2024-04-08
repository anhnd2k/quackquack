import { StyleSheet } from 'react-native';
import { extendTheme } from 'src/Themes';
import dimens from 'src/constants/dimens';
export const homeStyle = ({ colors }: extendTheme) =>
	StyleSheet.create({
		component: {
			padding: 10,
			marginBottom: 100,
		},
		text: {
			color: colors.white,
		},
		// top header
		topHeader: {
			height: 100,
			backgroundColor: colors.primaryColor,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 10,
			borderRadius: 10,
		},
		// pick year month
		pickDateYear: {
			width: '100%',
			height: 50,
			backgroundColor: colors.primaryColor,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		// zummiView
		zummiView: {
			height: 10,
			justifyContent: 'space-around',
			flexDirection: 'row',
		},
		wires: {
			height: 10,
			width: 5,
			backgroundColor: colors.primaryColor,
		},
		// calender style
		tabDate: {
			minWidth: 300,
			borderBottomColor: 'white',
			borderBottomWidth: 2,
			paddingVertical: 10,
		},
		titleCalendar: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			width: '100%',
		},
		itemDayName: {
			flexBasis: '14.2%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		itemDay: {
			flexBasis: '14%',
			justifyContent: 'center',
			alignItems: 'center',
			margin: 0.5,
			height: (dimens.deviceWidth - 22) * 0.14 + 18,
		},
		childView: {
			width: (dimens.deviceWidth - 10) * 0.112,
			height: (dimens.deviceWidth - 10) * 0.112,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: ((dimens.deviceWidth - 10) * 0.112) / 2,
			marginBottom: 4,
		},
		dayOfMonth: {
			backgroundColor: '#f0ebeb',
		},
		noneOfMonth: {
			backgroundColor: 'rgba(52, 52, 52, 0.0)',
		},
		dayActiveStyle: { backgroundColor: '#ccc' },
		listDate: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginTop: 10,
			position: 'relative',
		},
		textDay: {
			fontSize: 12,
			color: colors.text,
		},
		mainClender: {
			borderRadius: 10,
			backgroundColor: colors.primaryColor,
			shadowColor: '#000000',
			shadowOffset: {
				width: 0,
				height: 6,
			},
			shadowOpacity: 0.2,
			shadowRadius: 5.62,
			elevation: 8,
		},
		absoluteView: {
			position: 'absolute',
			width: (dimens.deviceWidth - 10) * 0.112 * 2.8,
			height: (dimens.deviceWidth - 10) * 0.112 * 1.2,
			backgroundColor: '#ddd',
			bottom: 0,
			right: 0,
			borderBottomRightRadius: 10,
			borderTopLeftRadius: 10,
			borderTopWidth: 5,
			borderLeftWidth: 5,
			borderColor: colors.background,
			justifyContent: 'center',
			alignItems: 'center',
		},
		textStudio: {
			fontWeight: 'bold',
			color: colors.primaryColor,
		},

		// BOTTOM VIEW
		bottomView: {
			backgroundColor: '#ccc',
			height: dimens.deviceHeight / 2,
		},
	});
