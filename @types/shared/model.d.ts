export interface Model {
  id: string;
  name: string;
  owned_by: string;
  active?: boolean;
}

export interface ModelInput {
  name: string;
  owned_by: string;
}

