import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import SideBar from "./SibeBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "@/features/user/userSlice";
import type { RootState } from "@/store/store";

const Navigation = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("desktop"));
  const [isOpenMobileDrawer, setIsOpenMobileDrawer] = useState(false);
  const { isDrawerOpenByDefault } = useSelector(({ user }: RootState) => user);
  const dispatch = useDispatch();

  const handlertoggleDrawer = () =>
    isMobile
      ? setIsOpenMobileDrawer((prev) => !prev)
      : dispatch(toggleDrawer());

  const open = isMobile ? isOpenMobileDrawer : isDrawerOpenByDefault;
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handlertoggleDrawer}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={open}
        onClose={handlertoggleDrawer}
        variant={isMobile ? "temporary" : "persistent"}
      >
        <SideBar />
      </Drawer>
    </>
  );
};

export default Navigation;
