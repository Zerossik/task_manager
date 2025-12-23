import { useState, type FormEvent } from "react";
import PrimaryTextField from "@/components/ui/TextField";
import Box from "@mui/material/Box";
import Button from "@/components/ui/Button";
import Stack from "@mui/material/Stack";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";
import type { SxProps, Theme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserName } from "@/features/user";

const style: Record<string, SxProps<Theme>> = {
  input: {
    color: "#ffffff",
    "&:autofill": { bgcolor: "transparent!important" },
  },
  button: {
    "&.Mui-disabled": {
      color: "rgba(255,255,255, 0.3)",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};

const StartPageNameForm = () => {
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValid = value.trim().length >= 2 && value.trim().length <= 50;

  const handlerSubmin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setUserName(value));
    navigate("/dashboard");
  };

  return (
    <Box component="form" onSubmit={handlerSubmin}>
      <Stack alignItems="center" gap={2}>
        <PrimaryTextField
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          name="userName"
          label="Please enter your name"
          variant="outlined"
          autoComplete="on"
          required
          color="secondary"
          slotProps={{ htmlInput: { sx: style.input } }}
        />

        <Button
          size="medium"
          type="submit"
          disabled={!isValid}
          color="secondary"
          endIcon={
            <PanToolAltOutlinedIcon
              sx={{
                transform: isValid ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s linear",
              }}
            />
          }
          sx={style.button}
        >
          {isValid ? "Let's go" : "Enter name"}
        </Button>
      </Stack>
    </Box>
  );
};

export default StartPageNameForm;
