// import { createContext, useContext, useState } from 'react';
 
// const DnDContext = createContext([null, (_:any) => {}]);
 
// export const DnDProvider = ({ children }:any) => {
//   const [type, setType] = useState(null);
 
//   return (
//     <DnDContext.Provider value={[type, setType]}>
//       {children}
//     </DnDContext.Provider>
//   );
// }
 
// export default DnDContext;
 
// export const useDnD = () => {
//   return useContext(DnDContext);
// }
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type DnDContextType = [string | null, (type: string | null) => void];

// Create the context with a proper default value
const DnDContext = createContext<DnDContextType>([null, () => {}]);

// Provider component with typed props
export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

// Export the context (optional, if needed elsewhere)
export default DnDContext;

// Hook with explicit return type
export const useDnD = (): DnDContextType => {
  return useContext(DnDContext);
};