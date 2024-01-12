"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarMenu,
  Switch,
  divider,
} from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "@/redux/reducers/userSlice";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme("");
  const [isSelected, setIsSelected] = React.useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((result) => {
        dispatch(logout());
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      setIsSelected(storedTheme === "light");
    }
  }, [setTheme]);

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsSelected(selectedTheme === "light");
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    function getmyprofile() {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyprofile`, {
          withCredentials: true,
        })
        .then((response) => response.data)
        .then((data) => {
          dispatch(login(data.user));
        })
        .catch((error) => {});
    }
    getmyprofile();
  }, []);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent backdrop-blur-md"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">FPI</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/profile">Profile</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/payment">Payment</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          {user?.user?.role === "admin" && (
            <Button radius="sm" color="secondary" variant="flat">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          {user.user ? (
            <Button
              color="primary"
              radius="sm"
              href="#"
              variant="flat"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          ) : (
            <Button radius="sm" color="primary" href="#" variant="flat">
              <Link href="/login" className="font-semibold">
                Login
              </Link>
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <Switch
            defaultSelected={isSelected}
            isSelected={isSelected}
            onValueChange={() => toggleTheme(isSelected ? "dark" : "light")}
            size="lg"
            color="secondary"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <SunIcon className={className} />
              ) : (
                <MoonIcon className={className} />
              )
            }
          ></Switch>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
