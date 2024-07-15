// import React, { ReactNode } from 'react';
// import Dash from '../components/Dash';

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       <Dash />
//       <main className="flex-1 p-4 overflow-x-hidden">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default Layout;


// Layout.tsx
import React, { ReactNode } from 'react';
import Dash from '../components/Dash';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Dash />
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;