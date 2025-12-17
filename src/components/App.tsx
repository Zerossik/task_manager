import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router/dom";
import router from "@/router";

function App() {
  return (
    <ThemeProvider theme={theme} noSsr>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
