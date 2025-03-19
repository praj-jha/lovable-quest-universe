
import React from 'react';
import { BuddyProvider } from './BuddyContext';
import BuddyButton from './BuddyButton';
import BuddyChat from './BuddyChat';

// This component wraps the BuddyProvider and related components
// to easily include them in the main application layout
const BuddyWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <BuddyProvider>
      {children}
      <BuddyButton />
      <BuddyChat />
    </BuddyProvider>
  );
};

export default BuddyWrapper;
