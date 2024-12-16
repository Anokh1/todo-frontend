export interface SettingProps {
  fetchData: () => Promise<void>;
  // fetchPrize: () => Promise<void>;
  // refreshAttendance: () => void;
}

export interface EmployeeInputProps {
  title: string;
  description: React.ReactNode; // Accepts JSX elements, strings, or other renderable types
}
