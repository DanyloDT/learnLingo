import { StylesConfig } from "react-select";

interface SelectStyleParams {
  width: string;
}

interface OptionType {
  value: string;
  label: string;
}

export const getSelectStyles = ({
  width,
}: SelectStyleParams): StylesConfig<OptionType, boolean> => ({
  control: (styles) => ({
    ...styles,
    width: width,
    height: "max-content",
    padding: "14px 14px 14px 18px",
    fontSize: "18px",
    fontWeight: "500",
    lineHeigh: "1.1",
    color: "#121417",
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    cursor: "pointer",

    border: "none",
    boxShadow: "none",

    "&:hover": {
      border: "#12141733",
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "0",
    marginRight: "20px",
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    padding: "0",
    transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
  }),
  singleValue: (styles) => ({ ...styles, margin: "0", color: "#121417" }),
  input: (styles) => ({ ...styles, padding: "0", margin: "0" }),
  menu: (styles) => ({
    ...styles,
    top: "90%",
    width: "100%",
    height: "max-content",

    borderRadius: "12px",
    background: `#ffffff`,
    color: "#121417",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "1.1",

    overflow: "auto",
  }),
  menuList: (styles) => ({
    ...styles,
    width: "100%",
    maxHeight: "none",
    padding: "14px 14px 14px 18px",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#12141733",
    width: "100%",
    height: "max-content",
  }),
  option: (styles, state) => ({
    ...styles,
    cursor: "pointer",

    color: state.isSelected ? "#121417" : "#12141733",
    backgroundColor: state.isSelected ? "#ffffff" : undefined,
    ":hover": {
      "&:hover": {
        color: "#121417",

        backgroundColor: undefined,
      },
    },
  }),
});
