import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';
import { useThemeContext, lightTheme, darkTheme } from '../Themes';
import { setNavigator } from './navigationService';
import ModalPortal from 'src/components/base/ModalPortal';

const Navigation = () => {
	const theme = useThemeContext();

	return (
		<NavigationContainer ref={setNavigator} theme={theme.mode === 'dark' ? darkTheme : lightTheme}>
			<DrawerNavigation />
			<ModalPortal />
		</NavigationContainer>
	);
};

export default Navigation;
