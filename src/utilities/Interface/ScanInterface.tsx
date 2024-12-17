export interface SettingProps {
  fetchName: () => Promise<void>;
  fetchPrize: () => Promise<void>;
  // refreshAttendance: () => void;
  fetchNameList: () => void | Promise<void>;
}

export interface EmployeeInputProps {
  title: string;
  description: React.ReactNode;
  type: string;
  nameList: any[];
  onFetchData: () => void | Promise<void>;
}

export interface SpinWheelProps {
  // initialPrizes: string[];
  prizeList: any[];
}
