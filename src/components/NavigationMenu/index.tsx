// NavigationMenu.tsx
import React from 'react';
import { classNames } from '../Header'; // Assuming classNames is defined in Header

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

interface NavigationMenuProps {
  currentNavigation: NavigationItem[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  currentNavigation,
}) => {
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {currentNavigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium',
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
