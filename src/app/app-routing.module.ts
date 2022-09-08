import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CflTeamComponent } from './cfl-team/cfl-team.component';
import { StandingsComponent } from './standings/standings.component';
import { CflPlayerComponent } from './cfl-player/cfl-player.component';
import { CflPlayersComponent } from './cfl-players/cfl-players.component';
import { RulesComponent } from './rules/rules.component';
import { BoxscoreComponent } from './cfl-schedule/boxscore/boxscore.component';
import { CflDraftComponent } from './cfl-draft/cfl-draft.component';
import { CflMovesComponent } from './cfl-moves/cfl-moves.component';
import { CflAdminComponent } from './cfl-admin/cfl-admin.component';
import { NflScheduleComponent } from './nfl-schedule/nfl-schedule.component';
import { PasswordResetComponent } from './login-bar/password-reset/password-reset.component';

const routes: Routes = [
  { path: 'team/:id', component: CflTeamComponent },
  { path: '', component: StandingsComponent },
  { path: 'player/:id', component: CflPlayerComponent },
  { path: 'stats', component: CflPlayersComponent },
  { path: 'moves', component: CflMovesComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'boxscore/:id', component: BoxscoreComponent },
  { path: 'draft', component: CflDraftComponent },
  { path: 'password-reset/:key', component: PasswordResetComponent },
  { path: 'nfl-schedule', component: NflScheduleComponent },
  { path: 'admin', component: CflAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
