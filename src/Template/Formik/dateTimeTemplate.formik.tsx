import moment from "moment";

export const DateTimeTemplate = (rowData: any, field: string) => {
  const formattedDateTime = moment(rowData[field]).format("DD MMM YYYY h:mm A");
  return <>{formattedDateTime}</>;
};

export const DateTemplate = (rowData: any, field: string) => {
  const formattedDate = moment(rowData[field]).format("DD MMM YYYY");
  return <>{formattedDate}</>;
};
