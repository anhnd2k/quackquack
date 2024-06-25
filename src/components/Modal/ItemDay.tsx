import { Text, TouchableOpacity, View } from 'react-native';
import React, { Key, memo } from 'react';
import { currentDayUnix, dayToUnix, getCurrentTime } from 'src/constants/Times';
import { homeStyle } from '../style/HomeStyle';
import { extendTheme } from 'src/Themes';
import { useTheme } from '@react-navigation/native';

const unixCurrentTime: number = currentDayUnix();

interface DataAfterFilter {
	day: number;
	emojiId: number;
	image: string;
}

interface ItemDayProp {
	yearPresent: number;
	monthPresent: number;
	data: DataAfterFilter;
	onPress: (currentTimeUnix: number) => void;
	key?: Key | null | undefined;
}

const ItemDay = ({ yearPresent, monthPresent, data, onPress, key }: ItemDayProp) => {
	const colors: extendTheme = useTheme() as extendTheme;
	const styles = homeStyle(colors);

	const itemCurrentTime = getCurrentTime(yearPresent, monthPresent, data.day);
	const itemCurrentUnix = dayToUnix(itemCurrentTime);

	const activeTouch = itemCurrentUnix <= unixCurrentTime;
	const isDay = itemCurrentUnix === unixCurrentTime;
	return (
		<TouchableOpacity
			disabled={!activeTouch}
			onPress={() => onPress(itemCurrentUnix)}
			style={styles.itemDay}
			key={key}
		>
			<View
				style={[
					styles.childView,
					data.day !== 0 ? styles.dayOfMonth : styles.noneOfMonth,
					activeTouch && styles.dayActiveStyle,
					isDay && { backgroundColor: 'red' },
				]}
			>
				<Text>{data?.emojiId}</Text>
			</View>
			<Text style={styles.textDay}>{data.day !== 0 ? data.day : ''}</Text>
		</TouchableOpacity>
	);
};

export default memo(ItemDay);
