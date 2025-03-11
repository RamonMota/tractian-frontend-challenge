import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ICompany } from '../services/companyService';


interface CompanyContextData {
  company: ICompany | null;
  setCompany: (company: ICompany) => void;
}

const CompanyContext = createContext<CompanyContextData>({ 
  company: null, 
  setCompany: () => {} 
});

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [company, setCompany] = useState<ICompany | null>(null);
  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) throw new Error('useCompany must be used within a CompanyProvider');
  return context;
};