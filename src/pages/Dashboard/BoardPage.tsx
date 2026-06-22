import { BoardPageHeader } from "@/components/BoardPageHeader/BoardPageHeader";
import { ColumnDialog } from "@/components/Columns/ColumnDialog";
import { Columns } from "@/components/Columns/Columns";
import { InnerContainer } from "@/components/ui/InnerContainer";
import { useBoards } from "@/features/boards/useBoards";
import { useColumns } from "@/features/columns/useColumns";
import { useTheme } from "@mui/material";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Button from "@ui/Button";
import AddIcon from "@ui/icons/AddIcon";
import { useState } from "react";

import { Navigate, Outlet, useParams } from "react-router";

export const BoardPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { slug } = useParams();
  const { getBoardBySlug } = useBoards();
  const { getColumnsByBoardId, createColumn } = useColumns();
  const theme = useTheme();

  const board = getBoardBySlug(slug || "");
  if (!board) return <Navigate to="/dashboard" replace />;

  const columns = getColumnsByBoardId(board.id);

  const mode = theme.palette.mode;

  const onCreate = (title: string) => {
    createColumn({ title, boardId: board.id });
  };

  return (
    <>
      <Box component="section" sx={{ height: "100%" }}>
        <InnerContainer
          component={Stack}
          sx={(theme) => ({
            height: "100%",
            gap: theme.spacing(theme.spacingConfig.sectionGap.mobile),
          })}
        >
          <BoardPageHeader title={board.title} />

          <Stack
            sx={(theme) => ({
              overflowX: "auto",
              gap: theme.spacingConfig.blockGap.mobile,
              mx: -theme.spacingConfig.containerPadding.mobile,
              px: theme.spacingConfig.containerPadding.mobile,
              [theme.breakpoints.up("desktop")]: {
                mx: -theme.spacingConfig.containerPadding.desktop,
                px: theme.spacingConfig.containerPadding.desktop,
              },
            })}
            direction="row"
            alignItems="flex-start"
            flex={1}
          >
            {columns.length > 0 && <Columns columns={columns} />}
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <AddIcon
                  variant={mode === "dark" ? "White" : "black"}
                  width={32}
                  height={32}
                />
              }
              sx={{
                width: 334,
                padding: "20px 0",
                flexShrink: 0,
                borderRadius: 2,
              }}
              onClick={() => setIsDialogOpen(true)}
            >
              Add column
            </Button>
          </Stack>

          {/* In the Outlet component will render task modal window */}
          <Outlet />
        </InnerContainer>
      </Box>
      <ColumnDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={onCreate}
      />
    </>
  );
};
