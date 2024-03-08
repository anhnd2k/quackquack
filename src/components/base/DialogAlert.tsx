import React from 'react';
import ModalPortal from './ModalPortal';
import { StyleSheet, View } from 'react-native';

export default class DialogAlert {
	static showCustomView(children: React.ReactElement): void {
		ModalPortal.show(<View style={styles.main}>{children}</View>);
	}
}

const styles = StyleSheet.create({
	main: {
		padding: 10,
		backgroundColor: '#fff',
	},
});
