'use client';
import { createContext, useContext } from 'react';

const ContentContext = createContext(null);

export function ContentProvider({ value, children }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
