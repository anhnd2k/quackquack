import React from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = Record<string, never>;

type State = {
	show: boolean;
	message: string;
};

class ModalPortal extends React.Component<Props, State> {
	showMessageTimeout: NodeJS.Timeout | null = null;
	hideLoadingTimeout: NodeJS.Timeout | null = null;
	textOpacity = new Animated.Value(0);
	static modal: ModalPortal;
	showing = false;
	constructor(props: Props) {
		super(props);
		this.state = {
			show: false,
			message: '',
		};
		ModalPortal.modal = this;
	}

	static show() {
		ModalPortal.modal.show();
		console.log('show');
	}

	static hide() {
		ModalPortal.modal.hide();
	}

	show() {
		if (!this.showing) {
			this.showing = true;
			this.setState({ show: true });
		}
	}

	hide() {
		if (this.showing) {
			this.showing = false;
			this.setState({ show: false });
		}
	}

	render() {
		const { show, message } = this.state;
		return (
			<Modal animationType="fade" transparent statusBarTranslucent visible={show}>
				<View
					style={{
						backgroundColor: '#ccc',
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
					}}
				>
					<Text>Modal Poratal</Text>
					<TouchableOpacity onPress={() => this.hide()}>
						<Text>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
}

export default ModalPortal;

const styles = StyleSheet.create({
	modal: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		zIndex: 20,
	},
	placeholder: {
		height: 120,
	},
	messageContainer: {
		alignSelf: 'stretch',
		height: 120,
	},
	message: {
		color: '#FFFFFF',
		fontSize: 16,
		marginHorizontal: 24,
		textAlign: 'center',
	},
	loading: {
		width: 175,
	},
});
