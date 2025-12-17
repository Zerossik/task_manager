import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import SideBar from "../SideBar";
import { useMediaQuery } from "@mui/material";

const MobileNavigation = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("desktop"));
  console.log(isMobile);

  return (
    <>
      {isMobile && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsOpenDrawer((prev) => !prev)}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <SideBar />
      </Drawer>
    </>
  );
};

export default MobileNavigation;
