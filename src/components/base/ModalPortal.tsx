import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

type Props = Record<string, never>;

type State = {
	show: boolean;
	children: React.ReactElement;
};

class ModalPortal extends React.Component<Props, State> {
	static modal: ModalPortal;
	showing = false;
	constructor(props: Props) {
		super(props);
		this.state = {
			show: false,
			children: null,
		};
		ModalPortal.modal = this;
	}

	static show(children) {
		ModalPortal.modal.show(children);
		console.log('show modal portal');
	}

	static dismiss() {
		ModalPortal.modal.dismiss();
	}

	show(props) {
		if (!this.showing) {
			this.showing = true;
			this.setState({ show: true, children: props });
		}
	}

	dismiss() {
		if (this.showing) {
			this.showing = false;
			this.setState({ show: false });
		}
	}

	render() {
		const { show, children } = this.state;
		return (
			<Modal animationType="fade" transparent statusBarTranslucent visible={show}>
				<View style={styles.modal}>{children}</View>
			</Modal>
		);
	}
}

export default ModalPortal;

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#cccccc24',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
});
