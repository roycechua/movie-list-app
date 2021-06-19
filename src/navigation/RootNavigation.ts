// RootNavigation
// Navigate to a Route outside of your component
import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const isReadyRef = React.createRef<NavigationContainerRef>();

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name : string, params : any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}