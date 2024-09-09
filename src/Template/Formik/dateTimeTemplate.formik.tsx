import moment from "moment";

interface DateTemplateProps {
  rowData: any;
  field: string;
  showTime?: boolean;
}

export const DateTemplate = ({
  rowData,
  field,
  showTime = false,
}: DateTemplateProps) => {
  const formatString = showTime ? "DD MMM YYYY h:mm A" : "DD MMM YYYY";
  const formattedDate = moment(rowData[field]).format(formatString);
  return <>{formattedDate}</>;
};
