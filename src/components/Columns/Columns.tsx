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
        height: "100%",
        gap: theme.spacing(theme.spacingConfig.blockGap.mobile),
      })}
    >
      {columns.map((column) => (
        <ListItem key={column.id} disablePadding>
          {/* Рендерим компонент Column с действиями */}
          <Column column={column} />
        </ListItem>
      ))}
    </Stack>
  );
};
