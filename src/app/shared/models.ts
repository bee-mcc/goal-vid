export enum ManagementType {
  MANAGED = 'managed',
  SELF_MANAGED = 'self-managed'
}

export enum FundingLevel {
  WELL_FUNDED = 'well-funded',
  MODERATELY_FUNDED = 'moderately-funded',
  UNDERFUNDED = 'underfunded'
}

export interface Goal {
  id: number;
  name: string;
  date: string;
  amount: number;
  managementType: ManagementType;
  fundingLevel: FundingLevel;
}

export interface GoalCard extends Goal {
  previousIndex?: number;
  previousManagementType?: ManagementType;
}

export interface GoalInput {
  retirementGoal: Goal;
  customGoals: Goal[];
  educationGoal: Goal[];
} 