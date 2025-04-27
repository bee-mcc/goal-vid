import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GoalCard, ManagementType } from '../shared/models';
import { trigger, style, animate, transition, query, stagger, sequence } from '@angular/animations';

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
  styleUrl: './goal-columns.component.scss',
  animations: [
    trigger('columnAnimation', [
      transition('* => *', [
        // Use sequence to ensure steps happen one after another
        sequence([
          // Step 1: Animate the exit of existing cards - faster stagger (30ms)
          query(':leave', [
            stagger(30, [
              animate('250ms ease-in', style({ opacity: 0, transform: 'translateY(100px)' }))
            ])
          ], { optional: true }),
          
          // Step 2: Shorter delay to ensure all cards have disappeared
          animate('200ms', style({}))
          
          // After this sequence completes, new cards will appear without animation
        ])
      ])
    ])
  ]
})
export class GoalColumnsComponent implements OnChanges {
  @Input() goalList: GoalCard[] = [];
  
  // Track previous state for animation
  private previousGoalStates: Map<number, ManagementType> = new Map();
  
  // These will hold the currently displayed goals
  selfManagedGoals: GoalCard[] = [];
  managedGoals: GoalCard[] = [];
  
  // These will hold the pending new goals (not yet displayed)
  private pendingSelfManagedGoals: GoalCard[] = [];
  private pendingManagedGoals: GoalCard[] = [];
  
  // Flag to track if animation is in progress
  private animationInProgress = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['goalList']) {
      // Store previous states before updating
      this.goalList.forEach(goal => {
        if (!this.previousGoalStates.has(goal.id)) {
          this.previousGoalStates.set(goal.id, goal.managementType);
        }
        
        goal.previousManagementType = this.previousGoalStates.get(goal.id) || goal.managementType;
        // Update the stored state for next change
        this.previousGoalStates.set(goal.id, goal.managementType);
      });
      
      // Calculate the new lists but don't display them yet
      this.pendingSelfManagedGoals = this.goalList.filter(goal => 
        goal.managementType === ManagementType.SELF_MANAGED);
      this.pendingManagedGoals = this.goalList.filter(goal => 
        goal.managementType === ManagementType.MANAGED);
      
      // If this is the first time or no animation is in progress, set directly
      if (!this.animationInProgress && 
          (this.selfManagedGoals.length === 0 && this.managedGoals.length === 0)) {
        this.selfManagedGoals = [...this.pendingSelfManagedGoals];
        this.managedGoals = [...this.pendingManagedGoals];
      } else {
        // Otherwise, trigger animation immediately
        this.animationInProgress = true;
        
        // First, clear the lists after animation completes (450ms for faster animation + delay)
        setTimeout(() => {
          // Clear the lists after animation completes
          this.selfManagedGoals = [];
          this.managedGoals = [];
          
          // Then wait 1 second before showing the new cards
          setTimeout(() => {
            // Update with the new lists after the additional 1-second delay
            this.selfManagedGoals = [...this.pendingSelfManagedGoals];
            this.managedGoals = [...this.pendingManagedGoals];
            this.animationInProgress = false;
          }, 250); // 1 second delay before redrawing
          
        }, 500); // Reduced from 650ms to 500ms to match faster animation
      }
    }
  }

  getSelfManagedGoals(): GoalCard[] {
    return this.selfManagedGoals;
  }

  getManagedGoals(): GoalCard[] {
    return this.managedGoals;
  }

  isManaged(goal: GoalCard): boolean {
    return goal.managementType === ManagementType.MANAGED;
  }

  isSelfManaged(goal: GoalCard): boolean {
    return goal.managementType === ManagementType.SELF_MANAGED;
  }
  
  // Method to handle animation done event
  onAnimationDone() {
    if (this.animationInProgress) {
      // Clear the lists first
      this.selfManagedGoals = [];
      this.managedGoals = [];
      
      // Wait 1 second before showing new cards
      setTimeout(() => {
        this.selfManagedGoals = [...this.pendingSelfManagedGoals];
        this.managedGoals = [...this.pendingManagedGoals];
        this.animationInProgress = false;
      }, 40);
    }
  }
}
