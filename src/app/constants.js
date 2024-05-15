import {
  PeopleAltOutlined,
  LockOutlined,
  HomeWorkOutlined,
  SavingsOutlined,
  DevicesOtherOutlined,
  FastfoodOutlined,
  DirectionsBusOutlined,
  CheckroomOutlined,
  CreditScoreOutlined,
  OndemandVideoOutlined,
  PetsOutlined,
  EnergySavingsLeafOutlined,
} from '@mui/icons-material';

export const SHARED = 'shared';
export const PRIVATE = 'private';
export const SAVINGS = 'savings';
export const MORTGAGE = 'mortgage';
export const FOOD = 'food';
export const TRANSPORT = 'transport';
export const CLOTHING = 'clothing';
export const LOAN = 'loan';
export const STREAMING = 'streaming';
export const PETS = 'pets';
export const OTHER = 'other';
export const FUNDS = 'funds';
export const PENSION = 'pension';

export const categoryOptions = [
  MORTGAGE,
  SHARED,
  PRIVATE,
  SAVINGS,
  TRANSPORT,
  FOOD,
  CLOTHING,
  STREAMING,
  OTHER,
  LOAN,
  PETS,
];

export const savingsCategoryOptions = [FUNDS, PENSION, OTHER];

export const categoryDescriptions = {
  [MORTGAGE]: 'Beloppet som visas är dina utgifter för boende',
  [SHARED]: 'Beloppet som visas är dina utgifter för gemensamma kostnader',
  [PRIVATE]: 'Beloppet som visas är dina privata fasta utgifter',
  [SAVINGS]: 'Beloppet som visas är ditt privata sparande',
  [OTHER]: 'Beloppet som visas är dina övriga utgifter',
  [FOOD]: 'Beloppet som visas är dina utgifter för mat och dryck',
  [TRANSPORT]: 'Beloppet som visas är dina transportkostnader',
  [CLOTHING]: 'Beloppet som visas är dina utgifter för kläder',
  [LOAN]: 'Beloppet som visas är dina lån och krediter',
  [STREAMING]: 'Beloppet som visas är dina utgifter för streamingtjänster',
  [PETS]: 'Beloppet som visas är dina utgifter för husdjur',
};

export const categoryTitles = {
  [SHARED]: 'Gemensamt',
  [PRIVATE]: 'Privat',
  [SAVINGS]: 'Sparande',
  [MORTGAGE]: 'Boende',
  [OTHER]: 'Övrigt',
  [FOOD]: 'Mat',
  [TRANSPORT]: 'Transport',
  [CLOTHING]: 'Kläder',
  [LOAN]: 'Lån & Krediter',
  [STREAMING]: 'Streaming',
  [PETS]: 'Husdjur',
};

export const savingsCategoryTitles = {
  [OTHER]: 'Övrigt',
  [PENSION]: 'Pension',
  [FUNDS]: 'Fonder',
};

export const iconStyle = { color: '#48FFB2' };

export const categoryIcons = {
  [SHARED]: (props) => <PeopleAltOutlined {...props} />,
  [PRIVATE]: (props) => <LockOutlined {...props} />,
  [SAVINGS]: (props) => <SavingsOutlined {...props} />,
  [MORTGAGE]: (props) => <HomeWorkOutlined {...props} />,
  [OTHER]: (props) => <DevicesOtherOutlined {...props} />,
  [FOOD]: (props) => <FastfoodOutlined {...props} />,
  [TRANSPORT]: (props) => <DirectionsBusOutlined {...props} />,
  [CLOTHING]: (props) => <CheckroomOutlined {...props} />,
  [LOAN]: (props) => <CreditScoreOutlined {...props} />,
  [STREAMING]: (props) => <OndemandVideoOutlined {...props} />,
  [PETS]: (props) => <PetsOutlined {...props} />,
  CURRENT_SAVINGS: (props) => <EnergySavingsLeafOutlined {...props} />,
};

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};
