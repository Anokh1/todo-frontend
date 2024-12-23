export const getDateRangePeriod = (
  period: "days" | "months" | "year",
  amount: number = 1
) => {
  const present = new Date();
  const startDate = new Date(present);

  if (period === "days") {
    startDate.setDate(present.getDate() - amount);
  } else if (period === "months") {
    startDate.setMonth(present.getMonth() - amount);
  } else if (period === "year") {
    startDate.setFullYear(present.getFullYear() - amount);
  }

  return [startDate, present];
};
