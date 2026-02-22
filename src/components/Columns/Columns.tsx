import { List, ListItem } from "@mui/material";
import Stack from "@mui/material/Stack";

import Column from "./Column/Column";
import type { Column as ColumnType } from "@/features/columns/columnSlice";

type PropsType = {
  columns: ColumnType[];
};

export const Columns = ({ columns }: PropsType) => {
  return (
    <Stack
      component={List}
      direction="row"
      disablePadding
      alignItems="stretch"
      sx={(theme) => ({
        gap: theme.spacing(theme.spacingConfig.blockGap.mobile),
        maxHeight: `calc(100% - ${theme.spacing(theme.spacingConfig.blockGap.mobile)})`,
      })}
    >
      {columns.map((column) => (
        <ListItem key={column.id} disablePadding sx={{ alignItems: "stretch" }}>
          {/* Рендерим компонент Column с действиями */}
          <Column column={column} />
        </ListItem>
      ))}
    </Stack>
  );
};
