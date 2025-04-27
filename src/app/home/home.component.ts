import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalColumnsComponent } from '../goal-columns/goal-columns.component';
import { GoalCard, GoalInput, ManagementType, FundingLevel } from '../shared/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoalColumnsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  goalInput: GoalInput;
  goalList: GoalCard[] = [];

  constructor() {
    this.goalInput = this.initializeGoalInput();
    this.updateGoalList();
  }

  updateGoalList(): void {
    this.goalList = [
      this.goalInput.retirementGoal,
      ...this.goalInput.customGoals,
      ...this.goalInput.educationGoal
    ];
  }

  changeGoalInput(): void {
    this.goalInput = {
      retirementGoal: {
        id: 1,
        name: 'Retirement',
        date: '2025-01-01',
        amount: 100000,
        managementType: ManagementType.MANAGED,
        fundingLevel: FundingLevel.WELL_FUNDED
      },
      customGoals: [
        {
          id: 2,
          name: 'Custom Goal 1',
          date: '2025-01-01',
          amount: 100000,
          managementType: ManagementType.MANAGED,
          fundingLevel: FundingLevel.WELL_FUNDED
        },
        {
          id: 3,
          name: 'Custom Goal 2',
          date: '2025-01-01',
          amount: 100000,
          managementType: ManagementType.SELF_MANAGED,
          fundingLevel: FundingLevel.WELL_FUNDED
        }
      ],
      educationGoal: [
        {
          id: 4,
          name: 'Education Goal 1',
          date: '2025-01-01',
          amount: 100000,
          managementType: ManagementType.MANAGED,
          fundingLevel: FundingLevel.WELL_FUNDED
        }
      ]
    };
    this.updateGoalList();
  }

  returnGoalInputToNormal(): void {
    this.goalInput = this.initializeGoalInput();
    this.updateGoalList();
  }

  initializeGoalInput(): GoalInput {
    return {
      retirementGoal: {
        id: 1,
        name: 'Retirement',
        date: '2025-01-01',
        amount: 100000,
        managementType: ManagementType.MANAGED,
        fundingLevel: FundingLevel.WELL_FUNDED
      },
      customGoals: [
        {
          id: 2,
          name: 'Custom Goal 1',
          date: '2025-01-01',
          amount: 100000,
          managementType: ManagementType.SELF_MANAGED,
          fundingLevel: FundingLevel.WELL_FUNDED
        },
        {
          id: 3,
          name: 'Custom Goal 2',
          date: '2025-01-01',
          amount: 100000,
          managementType: ManagementType.SELF_MANAGED,
          fundingLevel: FundingLevel.WELL_FUNDED
        }
      ],
      educationGoal: [
        {
          id: 4,
          name: 'Education Goal 1',
          date: '2025-01-01',
          amount: 100000,
          managementType: ManagementType.SELF_MANAGED,
          fundingLevel: FundingLevel.WELL_FUNDED
        }
      ]
    };
  }
}
