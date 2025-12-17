import { isValidColor } from "@/types/guards/isValidColor";
import { styled } from "@mui/material/styles";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

const CustomTextField = styled(TextField)<TextFieldProps>(
  ({ theme, color, error }) => {
    if (isValidColor(color)) {
      const paletteColor = theme.palette[error ? "error" : color];
      return {
        "& .MuiInputBase-root": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: paletteColor.main,
            opacity: "0.4",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: paletteColor.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            opacity: "1",
          },
        },
      };
    }
    return {};
  }
);

export default CustomTextField;
