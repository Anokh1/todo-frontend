import moment from "moment";

type RowData = Record<string, any>;
type Field = string;

export const dataBodyTemplate = (
  rowData: RowData,
  field: Field
): JSX.Element => {
  if (!rowData[field]) {
    return <span></span>;
  }

  const formattedDateTime = moment(rowData[field]).format(
    "DD MM YYYY HH:mm:ss"
  );

  return <span>{formattedDateTime}</span>;
};
