import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

enum ManagementType {
  MANAGED = 'managed',
  SELF_MANAGED = 'self-managed'
}

enum FundingLevel {
  WELL_FUNDED = 'well-funded',
  MODERATELY_FUNDED = 'moderately-funded',
  UNDERFUNDED = 'underfunded'
}

interface Goal {
  id: number;
  name: string
  date: string;
  amount: number;
  managementType: ManagementType;
  fundingLevel: FundingLevel;
}

interface GoalCard extends Goal {
  previousIndex?: number;
  previousManagementType?: ManagementType;
}

interface GoalInput {
  retirementGoal: Goal;
  customGoals: Goal[];
  educationGoal: Goal[];
}




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnChanges {
  @Input() goalInput!: GoalInput;

  goalList: GoalCard[] = [];

  title = 'goal-card-animations';

  constructor() {
    this.goalInput = this.initializeGoalInput();
  }

  //flatten the goal input into a single array of goals
  ngOnInit(): void {
    
      this.goalList = [
        this.goalInput.retirementGoal,
        ...this.goalInput.customGoals,
        ...this.goalInput.educationGoal
      ]

      console.log(this.goalList);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    this.goalList.forEach(goal => {
      goal.previousIndex = this.goalList.findIndex(g => g.id === goal.id);
      goal.previousManagementType = goal.managementType;
    })

    //find each goal in the input and update the goal list with new management type
    const retirementGoal = this.goalInput.retirementGoal;
    const retirementGoalIndex = this.goalList.findIndex(g => g.id === retirementGoal.id);
    if (retirementGoalIndex !== -1) {
      this.goalList[retirementGoalIndex].managementType = retirementGoal.managementType;
    }

    const customGoals = this.goalInput.customGoals;
    customGoals.forEach(goal => {
      const customGoalIndex = this.goalList.findIndex(g => g.id === goal.id);
      if (customGoalIndex !== -1) {
        this.goalList[customGoalIndex].managementType = goal.managementType;
      }
    })

    const educationGoal = this.goalInput.educationGoal;
    educationGoal.forEach(goal => {
      const educationGoalIndex = this.goalList.findIndex(g => g.id === goal.id);
      if (educationGoalIndex !== -1) {
        this.goalList[educationGoalIndex].managementType = goal.managementType;
      }
    })
    
  }

  isManaged(goal: Goal): boolean {
    return goal.managementType === ManagementType.MANAGED;
  }

  isSelfManaged(goal: Goal): boolean {
    return goal.managementType === ManagementType.SELF_MANAGED;
  }

  changeGoalInput() {
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
    }

    this.ngOnChanges({});
  }

  returnGoalInputToNormal() {
    this.goalInput = this.initializeGoalInput();
    this.ngOnChanges({});
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
          managementType: ManagementType.MANAGED,
          fundingLevel: FundingLevel.WELL_FUNDED
        }
      ]
    }
  }
}
