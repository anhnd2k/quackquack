import React from 'react';
import ModalPortal from './ModalPortal';
import { StyleSheet, View } from 'react-native';

export default class DialogAlert {
	static showCustomView(children: React.ReactElement): void {
		ModalPortal.show({
			children: (
				<View style={styles.mainAlign}>
					<View style={styles.mainCustomView}>{children}</View>
				</View>
			),
			isTouchOutside: false,
		});
	}

	static showEmojiView(children: React.ReactElement): void {
		ModalPortal.show({
			children: <View style={styles.mainPickEmoji}>{children}</View>,
			isTouchOutside: true,
		});
	}
}

const styles = StyleSheet.create({
	mainCustomView: {
		padding: 10,
		backgroundColor: '#fff',
	},
	mainPickEmoji: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	mainAlign: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
