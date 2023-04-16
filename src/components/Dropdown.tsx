import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import { Icon, IconType } from './Icon';

export interface DropdownItemProps {
  label: string;
  action: Function;
  icon: IconType;
  iconHover: IconType;
}

export interface DropDownGroupProps {
  name: string;
  items: DropdownItemProps[];
}

export interface DropdownProps {
  label: string;
  items: DropDownGroupProps[];
  showArrow?: boolean;
}

export function Dropdown({
  label,
  items: groups,
  showArrow = false,
}: DropdownProps) {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-full inline-flex justify-center text-sm font-medium text-white hover:text-slate-100">
            {label}
            {showArrow && (
              <ChevronDownIcon
                className="ml-1 mr-1 h-5 w-5"
                aria-hidden="true"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {groups.map(group => (
              <div key={group.name} className="p-1">
                {group.items.map(item => (
                  <Menu.Item key={item.label}>
                    {({ active }) => (
                      <button
                        className={clsx(
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm t-black',
                          {
                            'bg-blue-500 text-white': active,
                          },
                        )}
                        onClick={() => item.action()}
                      >
                        {active ? (
                          <Icon
                            name={item.iconHover}
                            className="mr-2 h-5 w-5 text-blue-300"
                          />
                        ) : (
                          <Icon
                            name={item.icon}
                            className="mr-2 h-5 w-5 text-blue-300"
                          />
                        )}
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
