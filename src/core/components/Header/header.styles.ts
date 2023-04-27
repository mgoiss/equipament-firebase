import styled from "styled-components";
import { Box, AppBar, List, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

export const BoxMenuMobile = styled(Box).attrs({
  display: { xs: "flex", sm: "none" },
})``;

export const BoxMenuDesktop = styled(Box).attrs({
  flexGrow: 1,
  display: { xs: "none", sm: "flex" },
})`
  height: 62px;
  align-items: center;
  justify-content: flex-start;
`;

export const NavegationLinkMobile = styled(NavLink)`
  text-decoration: none;
  text-aling: center;
  text-transform: uppercase;
  color: inherit;
  font-style: normal;
`;

export const NavegationLink = styled(NavegationLinkMobile)`
  color: rgba(255, 255, 255, 0.5);

  height: 100%;
  display: flex;

  &:hover {
    color: #ffffff;
  }

  &.active {
    font-weight: bolder;
    color: #ffffff;
    border-bottom: 2px solid #fff;
  }
`;

export const ListItemMenu = styled(ListItemButton).attrs({
  my: 2,
  color: "white",
  display: "block",
})`
  width: 150px;
  justify-content: center !important;
  text-transform: uppercase;
`;
