import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
	margin: number;
};

const Spacer = (props: Props) => {
	return <View style={{ margin: props.margin || 5 }} />;
};

export default Spacer;

const styles = StyleSheet.create({});
