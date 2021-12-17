import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';


export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
  React.createRef();

export function navigate(name: any, params: any) {
  navigationRef.current?.navigate(name, params);
}