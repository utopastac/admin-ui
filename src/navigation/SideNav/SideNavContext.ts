import { createContext, useContext } from 'react';

interface SideNavContextValue {
  onSelect: (id: string) => void;
  highContrast: boolean;
  fullWidth: boolean;
  /** The id of the currently active/selected item, if any. */
  activeId?: string;
}

export const SideNavContext = createContext<SideNavContextValue>({
  onSelect: () => {},
  highContrast: false,
  fullWidth: false,
  activeId: undefined,
});

export function useSideNavContext() {
  return useContext(SideNavContext);
}
