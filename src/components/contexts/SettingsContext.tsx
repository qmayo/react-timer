import React, { createContext } from 'react';
import { SettingsInterface } from '../../types';

const SettingsContext = createContext<SettingsInterface>(
  undefined as unknown as SettingsInterface
);

export default SettingsContext;
