export type AccountType = 'basic' | 'premium';

export interface RegisterViewProps {
  accountType: AccountType | null;
  showPassword: boolean;
  error: string;
  onSelectAccountType: (type: AccountType) => void;
  onTogglePasswordVisibility: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
