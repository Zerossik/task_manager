import { BoardPageHeader } from "@/components/BoardPageHeader/BoardPageHeader";
import { Columns } from "@/components/Columns/Columns";
import { InnerContainer } from "@/shared/ui/InnerContainer";
import { useBoards } from "@/features/boards/useBoards";
import { useColumns } from "@/features/columns/useColumns";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Navigate, Outlet, useParams } from "react-router";

export const BoardPage = () => {
  const { slug } = useParams();
  const { getBoardBySlug } = useBoards();

  const board = getBoardBySlug(slug || "");

  if (!board) return <Navigate to="/dashboard" replace />;

  return (
    <Box component="section" sx={{ height: "100%" }}>
      <InnerContainer
        component={Stack}
        sx={(theme) => ({
          height: "100%",
          gap: theme.spacing(theme.spacingConfig.sectionGap.mobile),
        })}
      >
        <BoardPageHeader title={board.title} />

        <Columns boardID={board.id} />

        {/* In the Outlet component will render task modal window */}
        <Outlet />
      </InnerContainer>
    </Box>
  );
};
