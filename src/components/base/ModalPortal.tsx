import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = Record<string, never>;

type PropShow = {
	children: React.ReactElement;
	isTouchOutside: boolean;
};

type State = {
	show: boolean;
	children: React.ReactElement;
	isTouchOutside: boolean;
};

class ModalPortal extends React.Component<Props, State> {
	static modal: ModalPortal;
	showing = false;
	constructor(props: Props) {
		super(props);
		this.state = {
			show: false,
			children: null,
			isTouchOutside: false,
		};
		ModalPortal.modal = this;
	}

	static show(children: PropShow) {
		ModalPortal.modal.show(children);
		console.log('show modal portal');
	}

	static dismiss() {
		ModalPortal.modal.dismiss();
	}

	show(props: PropShow) {
		if (!this.showing) {
			this.showing = true;
			this.setState({ show: true, children: props.children, isTouchOutside: props.isTouchOutside });
		}
	}

	dismiss() {
		if (this.showing) {
			this.showing = false;
			this.setState({ show: false });
			if (this.state.isTouchOutside) {
				this.setState({ isTouchOutside: false });
			}
		}
	}

	render() {
		const { show, children, isTouchOutside } = this.state;
		return (
			<Modal animationType="fade" transparent statusBarTranslucent visible={show}>
				{isTouchOutside ? (
					<TouchableOpacity activeOpacity={1} onPressIn={() => this.dismiss()} style={styles.modal}>
						{children}
					</TouchableOpacity>
				) : (
					<View style={styles.modal}>{children}</View>
				)}
			</Modal>
		);
	}
}

export default ModalPortal;

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#00000036',
		zIndex: 1,
		flex: 1,
	},
});
