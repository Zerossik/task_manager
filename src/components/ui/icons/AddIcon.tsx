import { SvgIcon, type SvgIconProps } from "@mui/material";

const AddIcon = (props: SvgIconProps) => {
  const { width, height } = props;
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 28 28"
      sx={{ width: width || 28, height: height || 28 }}
    >
      <path
        d="M22 0H6C2.68629 0 0 2.68629 0 6V22C0 25.3137 2.68629 28 6 28H22C25.3137 28 28 25.3137 28 22V6C28 2.68629 25.3137 0 22 0Z"
        fill="#161616"
      />
      <path
        d="M14 9.9165V18.0832"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9165 14H18.0832"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
export default AddIcon;
