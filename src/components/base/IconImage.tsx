import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import React from 'react';

interface IconImageProps {
	style?: StyleProp<ImageStyle> | undefined;
	source;
}

const IconImage = ({ style, source }: IconImageProps) => {
	return <Image source={source} style={[style, styles.defauleSizeIcon]} />;
};

export default IconImage;

const styles = StyleSheet.create({
	defauleSizeIcon: {
		width: 30,
		height: 30,
	},
});
