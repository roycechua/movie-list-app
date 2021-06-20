import React from 'react';
import { ReactNode } from 'react';
import { ReactChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
	flex?: number;
	padding?: number;
	center?: boolean;
    backgroundColor?: string;
	children: ReactNode;
	customStyle?: StyleSheet;
};

const Screen: React.FC<Props> = (props: Props) => {
	let ScreenStyles: any = {
		flex: props.flex || 1,
		padding: props.padding || 5,
        backgroundColor: props.backgroundColor || null
	};

	if (props.center) {
		ScreenStyles = { ...ScreenStyles, justifyContent: 'center', alignItems: 'center'};
	}

	return (
		<View style={{ ...ScreenStyles, ...props.customStyle }}>
			{props.children}
		</View>
	);
};

export default Screen;
