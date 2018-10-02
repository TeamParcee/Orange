import { AuthGuard } from './services/auth-guard/auth-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard]  },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule'  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'checkdn-users', loadChildren: './pages/checkdn-users/checkdn-users.module#CheckdnUsersPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'view-profile', loadChildren: './pages/view-profile/view-profile.module#ViewProfilePageModule' },
  { path: 'img-viewer', loadChildren: './pages/img-viewer/img-viewer.module#ImgViewerPageModule' },
  { path: 'other-places', loadChildren: './pages/other-places/other-places.module#OtherPlacesPageModule' },
  { path: 'view-place', loadChildren: './pages/view-place/view-place.module#ViewPlacePageModule' },
  { path: 'inappbrowser', loadChildren: './pages/inappbrowser/inappbrowser.module#InappbrowserPageModule' },
  { path: 'saved-checkdns', loadChildren: './pages/saved-checkdns/saved-checkdns.module#SavedCheckdnsPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
