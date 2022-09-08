import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { url: environment.socket, options: {}};

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import { CflTeamComponent } from './cfl-team/cfl-team.component';
import { CflRosterComponent } from './cfl-team/cfl-roster/cfl-roster.component';
import { CflTeamScheduleComponent } from './cfl-team/cfl-schedule/cfl-schedule.component';
import { CflPlayersComponent } from './cfl-players/cfl-players.component';
import { CflPlayerComponent } from './cfl-player/cfl-player.component';
import { StatTableComponent } from './cfl-player/stat-table/stat-table.component';
import { CflTeamLinkComponent } from './links/cfl-team-link/cfl-team-link.component';
import { CflScheduleComponent } from './cfl-schedule/cfl-schedule.component';
import { PlayerLinkComponent } from './links/player-link/player-link.component';
import { RulesComponent } from './rules/rules.component';
import { LoginBarComponent } from './login-bar/login-bar.component';
import { NavBarComponent } from './links/nav-bar/nav-bar.component';
import { TickerGameComponent } from './cfl-schedule/ticker-game/ticker-game.component';
import { BoxscoreComponent } from './cfl-schedule/boxscore/boxscore.component';
import { NflTeamLinkComponent } from './links/nfl-team-link/nfl-team-link.component';
import { CflDraftComponent } from './cfl-draft/cfl-draft.component';
import { PlayerLineComponent } from './cfl-draft/player-line/player-line.component';
import { OrdinalPipe } from './ordinal.pipe';
import { NflResultComponent } from './links/nfl-result/nfl-result.component';
import { NflOpponentComponent } from './links/nfl-opponent/nfl-opponent.component';
import { GameBoxscoreComponent } from './cfl-schedule/game-boxscore/game-boxscore.component';
import { BoxscoreLineComponent } from './cfl-schedule/game-boxscore/boxscore-line/boxscore-line.component';
import { LoginPageComponent } from './login-bar/login-page/login-page.component';
import { CflMovesComponent } from './cfl-moves/cfl-moves.component';
import { MoveFloatComponent } from './cfl-moves/move-float/move-float.component';
import { WaiversComponent } from './cfl-team/waivers/waivers.component';
import { PasswordResetComponent } from './login-bar/password-reset/password-reset.component';
import { WinPctPipe } from './win-pct.pipe';
import { GbPipe } from './gb.pipe';
import { GameBoxscoreHeaderComponent } from './cfl-schedule/game-boxscore-header/game-boxscore-header.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { CflAdminComponent } from './cfl-admin/cfl-admin.component';
import { NavBarFloatComponent } from './links/nav-bar-float/nav-bar-float.component';
import { PhoneNavComponent } from './links/phone-nav/phone-nav.component';
import { LoginFloaterComponent } from './login-floater/login-floater.component';
import { FixDefensePipe } from './fix-defense.pipe';
import { WholeAppComponent } from './whole-app/whole-app.component';
import { ActivateFloatComponent } from './cfl-moves/activate-float/activate-float.component';
import { OwnerComponent } from './cfl-team/owner/owner.component';
import { SortTeamPipe } from './sort-team.pipe';
import { NflScheduleComponent } from './nfl-schedule/nfl-schedule.component';
import { GameStatusPipe } from './game-status.pipe';
import { NflGameComponent } from './nfl-schedule/nfl-game/nfl-game.component';
import { FileUploadComponent } from './uploads/file-upload/file-upload.component';
import { DndDirective } from './dnd.directive';
import { ProgressComponent } from './uploads/components/progress/progress.component';

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    CflTeamComponent,
    CflRosterComponent,
    CflTeamScheduleComponent,
    CflScheduleComponent,
    CflPlayersComponent,
    CflPlayerComponent,
    StatTableComponent,
    CflTeamLinkComponent,
    PlayerLinkComponent,
    RulesComponent,
    LoginBarComponent,
    NavBarComponent,
    TickerGameComponent,
    BoxscoreComponent,
    NflTeamLinkComponent,
    CflDraftComponent,
    PlayerLineComponent,
    OrdinalPipe,
    NflResultComponent,
    NflOpponentComponent,
    GameBoxscoreComponent,
    BoxscoreLineComponent,
    LoginPageComponent,
    CflMovesComponent,
    MoveFloatComponent,
    WaiversComponent,
    PasswordResetComponent,
    WinPctPipe,
    GbPipe,
    GameBoxscoreHeaderComponent,
    CflAdminComponent,
    NavBarFloatComponent,
    PhoneNavComponent,
    LoginFloaterComponent,
    FixDefensePipe,
    WholeAppComponent,
    ActivateFloatComponent,
    OwnerComponent,
    SortTeamPipe,
    NflScheduleComponent,
    GameStatusPipe,
    NflGameComponent,
    FileUploadComponent,
    DndDirective,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    PerfectScrollbarModule,
    SocketIoModule.forRoot(config),
    MatPasswordStrengthModule.forRoot(),
  ],
  providers: [
    CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
