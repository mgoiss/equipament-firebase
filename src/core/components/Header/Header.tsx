import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  BoxMenuDesktop,
  BoxMenuMobile,
  ListItemMenu,
  NavegationLink,
  NavegationLinkMobile,
} from "./header.styles";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const pages = ["cliente", "filial", "equipamentos"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile */}
          <BoxMenuMobile>
            <IconButton
              size="large"
              aria-label="screen options"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavegationLinkMobile to={`/${page}`}>
                    {page}
                  </NavegationLinkMobile>
                </MenuItem>
              ))}
            </Menu>
          </BoxMenuMobile>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none" },
              mr: 1,
              ml: 1,
            }}
          >
            <Link to={"/"}>
              <Logo width={90} height={40} />
            </Link>
          </Box>
          {/* Desktop */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 3, ml: 1 }}>
            <Link to={"/"}>
              <Logo width={100} height={50} />
            </Link>
          </Box>
          <BoxMenuDesktop>
            {pages.map((page) => (
              <NavegationLink
                key={page}
                to={`/${page}`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <ListItemMenu onClick={handleCloseNavMenu}>{page}</ListItemMenu>
              </NavegationLink>
            ))}
          </BoxMenuDesktop>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
