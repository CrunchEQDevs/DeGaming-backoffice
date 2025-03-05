"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { 
  LayoutGrid, 
  Users, 
  ListOrdered, 
  Package, 
  FileBarChart, 
  ChevronDown,
  MoreHorizontal
} from "lucide-react";

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  pro?: boolean;
  new?: boolean;
  subItems?: NavItem[];  // Subitems podem ser outros itens completos.
};

const navItems: NavItem[] = [
  {
    icon: <LayoutGrid className="w-5 h-5"/>,
    name: "Dashboard",
    path: "/",
  },
  // {
  //   icon: <UserCircleIcon />,
  //   name: "User Profile",
  //   path: "/profile",
  // },
  {
    icon: <Users className="w-5 h-5" />,
    name: "Players",
    pro: false,
    subItems: [
      { name: "Players", path: "/basic-tables", pro: false },
      { name: "Players daily total balance", path: "/1", pro: false },
      { name: "Duplicate players", path: "/2", pro: false },
      { name: "Duplicate phones", path: "/3", pro: false },
      { name: "Duplicate email", path: "/4", pro: false },
      { name: "Players last login", path: "/5", pro: false },
      { name: "Closed accounts", path: "/6", pro: false },
      { name: "IP access report", path: "/7", pro: false },
      { name: "Manual registration", path: "/8", pro: false },
      { name: "Credit facility", path: "9", pro: false },
      { name: "Shop report", path: "/10", pro: false }
    ],
  },
  {
    icon: <ListOrdered className="w-5 h-5" />,
    name: "Sportsbook",
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },

  {
    icon: <Package className="w-5 h-5" />,
    name: "Products",
    path: "/calendar",
    subItems: [
      { name: "Casinos", path: "/1", pro: false },
      { name: "Payments", path: "/2", pro: false },
    ],
  },
  {
    icon: <FileBarChart className="w-5 h-5" />,
    name: "Reports",
    subItems: [
      { name: "Bonus report", path: "/blank", pro: false },
      { name: "Casino", pro: false, subItems: [
        {name: "Casino activity report", path: "/casino", pro: false},
      ]},
      { name: "Financial", path: "/error-404", pro: false },
      { name: "Players", path: "/error-404", pro: false },
      { name: "Sports", path: "/error-404", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main"
  ) => (
    <ul className="flex flex-col overflow-x-hidden gap-2">
      {items.map((nav, index) => (
        <li key={nav.name} className="flex flex-col gap-2 justify-center w-full">
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item justify-between w-full group flex items-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active dark:text-white"
                  : "menu-item-inactive dark:text-gray-400"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
            <span
              className={`${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-icon-active dark:text-white"
                  : "menu-item-icon-inactive dark:text-gray-400"
              } flex items-center ${isExpanded || isHovered ? "" : "justify-center w-full"}`}
              >
              {nav.icon}
            </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text dark:text-gray-400 group-hover:dark:text-white`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDown
                  className={`ml-auto w-5 h-5 transition-transform duration-200 dark:text-gray-400 group-hover:dark:text-white ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500 dark:text-white"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
              href={nav.path}
              className={`menu-item group gap-3 w-full flex items-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 ${
                isActive(nav.path) 
                  ? "menu-item-active dark:text-white" 
                  : "menu-item-inactive dark:text-gray-400 hover:dark:text-white"
              }`}
            >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active dark:text-white"
                      : "menu-item-icon-inactive dark:text-gray-400 group-hover:dark:text-white"
                    } flex items-center ${isExpanded || isHovered ? "pr-10" : "justify-center w-full"}`}
                    >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text pl-2 dark:text-gray-400 group-hover:dark:text-white`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 w-full space-y-2 pl-4">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path || ""}
                      className={`menu-dropdown-item transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 block ${
                        isActive(subItem.path || "")
                          ? "menu-dropdown-item-active dark:text-white"
                          : "menu-dropdown-item-inactive dark:text-gray-400 hover:dark:text-white"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path || "")
                                ? "menu-dropdown-badge-active dark:text-white"
                                : "menu-dropdown-badge-inactive dark:text-gray-400 hover:dark:text-white"
                            } menu-dropdown-badge transition-colors duration-200`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path || "")
                                ? "menu-dropdown-badge-active dark:text-white"
                                : "menu-dropdown-badge-inactive dark:text-gray-400 hover:dark:text-white"
                            } menu-dropdown-badge transition-colors duration-200`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : [];
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path || "")) {
              setOpenSubmenu({
                type: menuType as "main",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname,isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
    className={`fixed mt-16 flex flex-col lg:mt-0 top-0 ${
      isExpanded || isHovered ? "px-5" : "px-3"
    } left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
      ${
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
          ? "w-[290px]"
          : ""
      }
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0`}
    style={{
      width: isExpanded || isMobileOpen || isHovered ? "290px" : "100px"
    }}
    onMouseEnter={() => !isExpanded && setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
      <div
        className={`py-8 items-center justify-center mt-5 mb-5 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logocrunch.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logocrunch.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logocrunch.svg"
              alt="Logo"
              width={340}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
            <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <MoreHorizontal className="flex items-center justify-center w-full h-5" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
