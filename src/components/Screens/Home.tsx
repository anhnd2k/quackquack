import { Text, ViewStyle, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { extendTheme } from 'src/Themes';
import dimens from 'src/constants/dimens';
import { useState, useEffect } from 'react';

function isLeap(year: number) {
	if (year % 4 || (year % 100 === 0 && year % 400)) {
		return 0;
	} else {
		return 1;
	}
}

function daysIn(month: number, year: number) {
	return month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);
}

function calendar(month: number, year: number) {
	const getMonthString = month < 10 ? `0${month}` : `${month}`;
	const startIndex = new Date(year + '-' + getMonthString + '-01').getDay();
	const endIndex = daysIn(month, year);
	const result = Array.apply(0, Array(35)).map(function () {
		return 0;
	});
	for (let i = startIndex; i < endIndex + startIndex; i++) {
		result[i] = i - startIndex + 1;
	}
	return result;
}

const dayOfWeek = {
	MONDAY: 'Thứ 2',
	TUESDAY: 'Thứ 3',
	WEDNESDAY: 'Thứ 4',
	THURSDAY: 'Thứ 5',
	FRIDAY: 'Thứ 6',
	SATURDAY: 'Thứ 7',
	SUNDAY: 'Chủ nhật',
};

const getPresentDate = (): Date => {
	return new Date();
};

const Home = ({ style }: { style: ViewStyle }) => {
	const colors: extendTheme = useTheme() as extendTheme;

	const [datePresent, setDatePresent] = useState(new Date().getDate());
	const [data, setData] = useState<number[]>([]);

	const styles = makeStyles(colors);
	const presentDate: number = getPresentDate().getDate();
	const presentMonth: number = getPresentDate().getMonth();

	useEffect(() => {
		setData(calendar(datePresent, 2024));
		console.log('=====> render');
	}, [datePresent]);
	return (
		<Animated.View style={[{ ...style, marginTop: dimens.statusBarHeight }, styles.component]}>
			<View style={styles.pickDateYear}>
				<TouchableOpacity onPress={() => setDatePresent(datePresent - 1)}>
					<Text>Prev</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>{datePresent}/2024</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setDatePresent(datePresent + 1)}>
					<Text>Next</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.tabDate}>
				<View style={[styles.titleCalendar]}>
					<View style={[styles.itemDayName]}>
						<Text>{dayOfWeek.SUNDAY}</Text>
					</View>
					<View style={[styles.itemDayName]}>
						<Text>{dayOfWeek.MONDAY}</Text>
					</View>
					<View style={[styles.itemDayName]}>
						<Text>{dayOfWeek.TUESDAY}</Text>
					</View>
					<View style={[styles.itemDayName]}>
						<Text>{dayOfWeek.WEDNESDAY}</Text>
					</View>
					<View style={[styles.itemDayName]}>
						<Text>{dayOfWeek.THURSDAY}</Text>
					</View>
					<View style={[styles.itemDayName]}>
						<Text>{dayOfWeek.FRIDAY}</Text>
					</View>
					<View style={[styles.itemDayName]}>
						<Text>{dayOfWeek.SATURDAY}</Text>
					</View>
				</View>
			</View>
			<View style={styles.listDate}>
				{data?.map((day: number, index: number) => {
					const isActiveTouch: boolean = day !== 0 && day <= presentDate;
					const isDay: boolean = presentDate === day;
					return (
						<TouchableOpacity disabled={!isActiveTouch} style={styles.itemDay} key={index}>
							<View
								style={[
									styles.childView,
									day !== 0 ? styles.dayOfMonth : styles.noneOfMonth,
									isActiveTouch && styles.dayActiveStyle,
									isDay && { backgroundColor: 'red' },
								]}
							/>
							<Text style={styles.textDay}>{day !== 0 ? day : ''}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
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
		// pick year month
		pickDateYear: {
			width: '100%',
			height: 50,
			backgroundColor: 'red',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 10,
		},
		// calender style
		tabDate: {
			minWidth: 300,
			borderBottomColor: 'white',
			borderBottomWidth: 1,
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
			width: (dimens.deviceWidth - 22) * 0.14 * 0.9,
			height: (dimens.deviceWidth - 22) * 0.14 * 0.9,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: ((dimens.deviceWidth - 22) * 0.14 * 0.9) / 2,
			marginBottom: 4,
		},
		dayOfMonth: {
			backgroundColor: '#f0ebeb',
		},
		noneOfMonth: {
			backgroundColor: colors.background,
		},
		dayActiveStyle: { backgroundColor: '#ccc' },
		listDate: {
			flexDirection: 'row',
			flexWrap: 'wrap',
		},
		textDay: {
			fontSize: 12,
			color: '#47b6e2',
		},
	});
export default Home;
