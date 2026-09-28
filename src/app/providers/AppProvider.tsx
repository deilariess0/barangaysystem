import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AppData, DataKey } from '../../types';
import { seedData } from '../../data/seed';

const STORAGE_KEY = 'barangay-digital-hub:v1';
interface AppContextValue { data: AppData; updateCollection: <K extends DataKey>(key: K, value: AppData[K]) => void; resetDemo: () => void; }
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
 const [data, setData] = useState<AppData>(() => {
  try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) as AppData : seedData; }
  catch { return seedData; }
 });
 useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);
 const updateCollection = <K extends DataKey>(key: K, value: AppData[K]) => setData(prev => ({...prev,[key]:value}));
 const resetDemo = () => setData(seedData);
 const value = useMemo(() => ({data,updateCollection,resetDemo}),[data]);
 return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppData() { const context = useContext(AppContext); if (!context) throw new Error('useAppData must be used inside AppProvider'); return context; }
