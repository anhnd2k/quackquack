import { Text, ViewStyle, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { extendTheme } from 'src/Themes';
import dimens from 'src/constants/dimens';
import { useState, useEffect } from 'react';
import { getCurrentTime, dayToUnix, dayOfWeek } from 'src/constants/Times';
import { useSelector } from 'react-redux';
import { getInfoEmoji } from '../../reduxStore/selectorConfig';
import DialogAlert from '../base/DialogAlert';
import ModalPickTime from '../Modal/ModalPickTime';
import { PayLoadEmoji } from 'src/reduxStore/actions/emoji';
import IconImage from 'src/components/base/IconImage';
import images from 'src/constants/images';
import { homeStyle } from '../style/HomeStyle';
import ItemDay from '../Modal/ItemDay';

interface DataAfterFilter {
	day: number;
	emojiId: number;
	image: string;
}

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

function calendar(
	month: number,
	year: number,
	infoEmojiCompare: PayLoadEmoji[],
	monthPresent: number,
	yearPresent: number
): DataAfterFilter[] {
	const getMonthString = month < 10 ? `0${month}` : `${month}`;
	const startIndex = new Date(year + '-' + getMonthString + '-01').getDay();
	const endIndex = daysIn(month, year);

	// const result = Array.apply(0, Array(35)).map(function () {
	// 	return 0;
	// });

	const listDataResule: DataAfterFilter[] = [];

	for (let i = startIndex; i < endIndex + startIndex; i++) {
		const day: number = i - startIndex + 1;
		const currentTime = getCurrentTime(yearPresent, monthPresent, day);
		const currentUnix = dayToUnix(currentTime);
		let emojiIdFind: number = null;
		if (infoEmojiCompare !== null) {
			const findEmoji = infoEmojiCompare.filter((itemData) => {
				return currentUnix === itemData.idDay;
			});
			emojiIdFind = findEmoji[0] !== undefined ? findEmoji[0].idEmoji : null;
		}
		listDataResule.push({
			day: day,
			emojiId: emojiIdFind,
			image: null,
		});
	}
	return listDataResule;
}

const getPresentDate = (): Date => {
	return new Date();
};

const Home = ({ style }: { style: ViewStyle }) => {
	const colors: extendTheme = useTheme() as extendTheme;
	const styles = homeStyle(colors);
	const nowTime: Date = new Date();
	const nowDate: number = nowTime.getDate();
	const nowMonth: number = nowTime.getMonth() + 1;
	const nowYear: number = nowTime.getFullYear();

	const [datePresent, setDatePresent] = useState<number>(nowDate);
	const [monthPresent, setMonthPresent] = useState<number>(nowMonth);
	const [yearPresent, setYearPresent] = useState<number>(nowYear);
	const [data, setData] = useState<DataAfterFilter[]>([]);

	const infoEmoji = useSelector(getInfoEmoji);

	// optimizition data compare

	useEffect(() => {
		console.log('===>>>> Home render');
		const listcalendar: DataAfterFilter[] = calendar(
			monthPresent,
			yearPresent,
			infoEmoji?.infoEmoji,
			monthPresent,
			yearPresent
		);
		setData(listcalendar);
	}, [monthPresent, yearPresent, infoEmoji]);

	const changeMonthCalender = (monthUpdate: number): void => {
		if (monthUpdate >= 1 && monthUpdate <= 12) {
			setMonthPresent(monthUpdate);
		} else {
			let yearNow: number = yearPresent;
			if (monthUpdate === 0) {
				yearNow = yearNow - 1;
				setYearPresent(yearNow);
				setMonthPresent(12);
			} else if (monthUpdate === 13) {
				yearNow = yearNow + 1;
				setYearPresent(yearNow);
				setMonthPresent(1);
			}
		}
	};

	const yearMonthPicked = (idMonth, idYear) => {
		setYearPresent(idYear);
		setMonthPresent(idMonth);
	};

	return (
		<Animated.ScrollView
			style={[{ ...style, marginTop: dimens.statusBarHeight }, styles.component]}
		>
			<View style={styles.topHeader} />
			{/* HEADER */}
			<View style={styles.pickDateYear}>
				<TouchableOpacity onPress={() => changeMonthCalender(monthPresent - 1)}>
					<IconImage source={images.leftIcon} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						DialogAlert.showCustomView(
							<ModalPickTime
								presentYear={yearPresent}
								presentMonth={monthPresent}
								onPress={(item) => yearMonthPicked(item.idMonth, item.idYear)}
							/>
						);
					}}
				>
					<Text>{`${monthPresent} / ${yearPresent}`}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => changeMonthCalender(monthPresent + 1)}>
					<IconImage source={images.rightIcon} />
				</TouchableOpacity>
			</View>
			<View style={styles.zummiView}>
				<View style={styles.wires} />
				<View style={styles.wires} />
			</View>
			{/* HEADER */}
			<View style={styles.mainClender}>
				{/* CALENDER */}
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
				{/* CALENDER */}
				{/* RENDER_CALENDER */}
				<View style={styles.listDate}>
					{data?.map((data: DataAfterFilter, index: number) => {
						return (
							<ItemDay
								yearPresent={yearPresent}
								monthPresent={monthPresent}
								data={data}
								onPress={(unixTime) => console.log(unixTime)}
								key={index}
							/>
						);
					})}
				</View>
				{/* RENDER_CALENDER */}
			</View>
			{/* VIEW BOTTOM */}
			<View style={styles.bottomView} />
		</Animated.ScrollView>
	);
};

export default Home;
