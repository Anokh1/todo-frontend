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
  onFetchName: () => void | Promise<void>;
  employeeInfo: any;
}

export interface SpinWheelProps {
  // initialPrizes: string[];
  prizeList: any[];
  employeeInfo: any;
  onFetchPrize: () => void | Promise<void>;
  onFetchName: () => void | Promise<void>;
}
