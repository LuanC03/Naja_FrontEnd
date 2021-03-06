import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './components/security/auth.guard';
import { ItemNewComponent } from './components/item-new/item-new.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

export const ROUTES: Routes =[
    { path : '', component: HomeComponent, canActivate : [AuthGuard] },
    { path : 'login', component : LoginComponent},
    { path : 'item-new', component : ItemNewComponent, canActivate : [AuthGuard]},
    { path : 'item-new/:id', component : ItemNewComponent, canActivate : [AuthGuard]},
    { path : 'item-list', component : ItemListComponent, canActivate : [AuthGuard]},
    { path : 'item-detail/:id', component : ItemDetailComponent, canActivate : [AuthGuard]}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
