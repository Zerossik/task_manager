import { PageLoader } from "@/components/PageLoader";
import { Box } from "@mui/material";
import { Outlet, useNavigation } from "react-router";

export const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return (
    <Box sx={{ height: "100vh" }}>
      {isLoading && <PageLoader />}
      <Outlet />
    </Box>
  );
};
