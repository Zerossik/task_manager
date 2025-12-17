import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import { useColorScheme } from "@mui/material/styles";
import MobileNavigation from "@/components/SideBar/MobileNavigation";

const Header = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const { mode, setMode } = useColorScheme();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ padding: 0 }}>
          <MobileNavigation />
          <Stack direction="row" alignItems="center" gap={2} ml="auto">
            <FormControl>
              <Select
                id="demo-simple-select"
                value={mode || "system"}
                onChange={(e) =>
                  setMode(e.target.value as "system" | "light" | "dark")
                }
                size="small"
              >
                <MenuItem value={"system"}>System</MenuItem>
                <MenuItem value={"light"}>Light</MenuItem>
                <MenuItem value={"dark"}>Dark</MenuItem>
              </Select>
            </FormControl>
            <Typography color="primary.contrastText">{userName}</Typography>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
