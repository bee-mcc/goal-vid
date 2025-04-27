import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GoalCard, ManagementType } from '../shared/models';

enum FundingLevel {
  WELL_FUNDED = 'well-funded',
  MODERATELY_FUNDED = 'moderately-funded',
  UNDERFUNDED = 'underfunded'
}

interface Goal {
  id: number;
  name: string;
  date: string;
  amount: number;
  managementType: ManagementType;
  fundingLevel: FundingLevel;
}

@Component({
  selector: 'app-goal-columns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goal-columns.component.html',
  styleUrl: './goal-columns.component.scss'
})
export class GoalColumnsComponent implements OnChanges {
  @Input() goalList: GoalCard[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['goalList']) {
      this.goalList.forEach(goal => {
        goal.previousIndex = this.goalList.findIndex(g => g.id === goal.id);
        goal.previousManagementType = goal.managementType;
      });
    }
  }

  isManaged(goal: GoalCard): boolean {
    return goal.managementType === ManagementType.MANAGED;
  }

  isSelfManaged(goal: GoalCard): boolean {
    return goal.managementType === ManagementType.SELF_MANAGED;
  }
}
