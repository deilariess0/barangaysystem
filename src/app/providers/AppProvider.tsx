import { 
  createContext, 
  useContext, 
  useEffect, 
  useMemo, 
  useState, 
  type ReactNode 
} from 'react';
import type { AppData, DataKey } from '../../types';
import { seedData } from '../../data/seed';

// ==========================================
// Constants
// ==========================================

const STORAGE_KEY = 'barangay-digital-hub:v1';

// ==========================================
// Context Definition
// ==========================================

interface AppContextValue {
  data: AppData;
  updateCollection: <K extends DataKey>(key: K, value: AppData[K]) => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ==========================================
// Provider Component
// ==========================================

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage (or fall back to seed data)
  const [data, setData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as AppData) : seedData;
    } catch {
      return seedData;
    }
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Update a specific collection within the app data
  const updateCollection = <K extends DataKey>(key: K, value: AppData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  // Reset all data back to the original seed data
  const resetDemo = () => {
    setData(seedData);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ data, updateCollection, resetDemo }),
    [data]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ==========================================
// Custom Hook
// ==========================================

export function useAppData() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppData must be used inside AppProvider');
  }
  
  return context;
}