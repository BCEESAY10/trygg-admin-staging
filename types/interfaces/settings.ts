import type { User } from '../user';

export type TabType = 'profile' | 'security' | 'language';

export interface SettingsPageComponentProps {
  role: 'SUPER' | 'SUB';
  defaultName: string;
  defaultEmail: string;
  user?: User;
}
