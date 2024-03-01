import { Disclosure } from '@headlessui/react';
import NavigationMenu from '../NavigationMenu';
import ProfileDropdown from '../ProfileDropdown';
import MobileMenuButton from '../MobileMenuButton';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const navigation = [
  { name: 'Polls', href: '/', current: true },
  { name: 'Create Poll', href: '/create-poll', current: false },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Header: React.FC<any> = ({ children }) => {
  const location = useLocation();
  const [currentNavigation, setCurrentNavigation] = useState(navigation);

  useEffect(() => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    }));
    setCurrentNavigation(updatedNavigation);
  }, [location.pathname]);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <MobileMenuButton open={open}></MobileMenuButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <NavigationMenu
                    currentNavigation={currentNavigation}
                  ></NavigationMenu>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <ProfileDropdown></ProfileDropdown>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </div>
  );
};

export default Header;
