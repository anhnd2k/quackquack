import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import ModalPortal from 'src/components/base/ModalPortal';
import dimens from 'src/constants/dimens';
import { useTheme } from '@react-navigation/native';
import { extendTheme } from 'src/Themes';

interface DataResult {
	idMonth: number;
	idYear: number;
}

interface ModalProps {
	onPress?: ({ idMonth, idYear }: DataResult) => void;
	presentYear: number;
	presentMonth: number;
}

interface MonthPick {
	text: string;
	id: number;
}

const monthPicks: MonthPick[] = [
	{
		id: 1,
		text: 'Jan',
	},
	{
		id: 2,
		text: 'Fed',
	},
	{
		id: 3,
		text: 'Mar',
	},
	{
		id: 4,
		text: 'Apr',
	},
	{
		id: 5,
		text: 'May',
	},
	{
		id: 6,
		text: 'Jun',
	},
	{
		id: 7,
		text: 'July',
	},
	{
		id: 8,
		text: 'Aug',
	},
	{
		id: 9,
		text: 'Sep',
	},
	{
		id: 10,
		text: 'Oct',
	},
	{
		id: 11,
		text: 'Nov',
	},
	{
		id: 12,
		text: 'Dec',
	},
];
const fromYear = 2000;
const toYear = 2050;
const heightView: number = dimens.deviceHeight / 3;

const ModalPickTime = ({ onPress, presentMonth, presentYear }: ModalProps) => {
	const colors: extendTheme = useTheme() as extendTheme;
	const styles = makeStyles(colors);
	const [yearPicked, setYearPicked] = useState<number>(presentYear);
	const [monthPicked, setMonthPicked] = useState<number>(presentMonth);
	const [yearList] = useState<number[]>(() => {
		return Array.from(Array(toYear - fromYear)).map((_, index) => index + fromYear);
	});
	const [dataSourceCords, setDataSourceCords] = useState([]);

	const flatListRef = useRef<FlatList>(null);
	const scrollViewRef = useRef(null);

	const [indexScroll, setIndexScroll] = useState(1);
	const [initScrollYear, setInitScrollYear] = useState<boolean>(false);
	const [isDisableTouch, setIsDisableTouch] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setInitScrollYear(true);
			setTimeout(() => {
				flatListRef.current?.scrollToIndex({ index: 1, animated: true });
				setIsDisableTouch(false);
			}, 1200);
		}, 100);
	}, []);

	useEffect(() => {
		if (initScrollYear) {
			setTimeout(() => {
				scrollViewRef.current.scrollTo({
					x: dataSourceCords[yearList.indexOf(yearPicked) - 2] + 36,
					y: 0,
				});
			}, 200);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initScrollYear, yearPicked]);

	const scrollPickYear = (isHidden: boolean) => {
		let indexTo = null;
		if (isHidden) {
			indexTo = 1;
		} else {
			indexTo = indexScroll === 0 ? 1 : 0;
		}
		flatListRef.current.scrollToIndex({
			index: indexTo,
		});
		setIndexScroll(indexTo);
	};

	// const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
	// 	setIndexScroll(viewableItems[0].index === 0 ? 1 : 0);
	// }, []);

	const renderYear = (year, idx) => {
		return (
			<TouchableOpacity
				disabled={isDisableTouch}
				onPress={() => setYearPicked(year)}
				onLayout={(event) => {
					const layout = event.nativeEvent.layout;
					dataSourceCords[idx] = layout.x;
					setDataSourceCords(dataSourceCords);
				}}
				style={[styles.itemYear, { backgroundColor: year === yearPicked ? 'red' : '#ccc' }]}
				key={idx}
			>
				<Text>{year}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.main}>
			<View style={styles.header}>
				<Text>Prev</Text>
				<TouchableOpacity onPress={() => scrollPickYear(false)}>
					<Text>{presentYear}</Text>
				</TouchableOpacity>
				<Text>Next</Text>
			</View>

			<View style={styles.mainWrap}>
				<FlatList
					// onViewableItemsChanged={_onViewableItemsChanged}
					// initialScrollIndex={1}
					scrollEnabled={false}
					// onScrollToIndexFailed={(info) => {
					// 	const wait = new Promise((resolve) => setTimeout(resolve, 1200));
					// 	wait.then(() => {
					// 		flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
					// 		setIndexScroll(info.index);
					// 	});
					// }}
					ref={flatListRef}
					data={[1, 2]}
					keyExtractor={(item) => JSON.stringify(item)}
					renderItem={({ index, item }) => {
						return (
							<>
								{item === 1 ? (
									<View key={index} style={styles.mainChildYear}>
										<View style={styles.viewPickYear}>
											<Animated.ScrollView
												ref={scrollViewRef}
												scrollToOverflowEnabled={true}
												scrollEventThrottle={1}
												horizontal
											>
												{yearList.map(renderYear)}
											</Animated.ScrollView>
										</View>
									</View>
								) : (
									<View style={styles.mainChild}>
										{/* <View style={styles.mainChildMonth}> */}
										{monthPicks.map((item: MonthPick, idx: number) => {
											const isPicked = item.id === monthPicked;
											return (
												<TouchableOpacity
													disabled={isDisableTouch}
													onPress={() => {
														setMonthPicked(item.id);
														scrollPickYear(true);
													}}
													key={idx}
													style={[styles.itemWrap, isPicked ? styles.isPicked : styles.isNormal]}
												>
													<Text>{item.text}</Text>
												</TouchableOpacity>
											);
										})}
										{/* </View> */}
									</View>
								)}
							</>
						);
					}}
					showsVerticalScrollIndicator={false}
					pagingEnabled
				/>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<TouchableOpacity onPress={() => ModalPortal.dismiss()}>
					<Text>Close</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						onPress({
							idMonth: monthPicked,
							idYear: yearPicked,
						});
						ModalPortal.dismiss();
					}}
				>
					<Text>Xong</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(ModalPickTime);

const makeStyles = ({ colors }: extendTheme) =>
	StyleSheet.create({
		main: {
			width: dimens.deviceWidth * 0.75,
			backgroundColor: colors.primaryColor,
		},
		header: {
			justifyContent: 'space-between',
			flexDirection: 'row',
			marginVertical: 10,
		},
		itemWrap: {
			flexBasis: (dimens.deviceWidth * 0.75) / 3,
			// marginHorizontal: 5,
			alignItems: 'center',
			marginBottom: 10,
			paddingVertical: 10,
			paddingHorizontal: 15,
			borderRadius: 10,
		},
		isPicked: {
			backgroundColor: colors.primaryColor,
		},
		isNormal: {
			backgroundColor: '#ccc',
		},
		mainWrap: {
			height: heightView,
			alignItems: 'center',
		},
		mainChild: {
			height: heightView,
			justifyContent: 'center',
			flexDirection: 'row',
			flexWrap: 'wrap',
		},
		mainChildYear: {
			height: heightView * 0.33,
			backgroundColor: '#ccc',
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		viewPickYear: {
			backgroundColor: '#ccc',
		},
		mainChildMonth: { width: '100%', flexWrap: 'wrap', flexDirection: 'row' },
		itemYear: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 10,
			marginHorizontal: 10,
			backgroundColor: '#fff',
			marginVertical: 20,
			borderTopLeftRadius: 5,
			borderBottomRightRadius: 5,
		},
	});
