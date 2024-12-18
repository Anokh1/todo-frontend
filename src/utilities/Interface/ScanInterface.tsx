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
  // nameList: any[];
  dataList: any[];
  onFetchDataList: () => void | Promise<void>;
  employeeInfo: any;
  activeTab: number
}

export interface SpinWheelProps {
  prizeList: any[];
  employeeInfo: any;
  onFetchPrize: () => void | Promise<void>;
  onFetchName: () => void | Promise<void>;
  onUpdateEmployeeInfo: (info: any) => void;
}
