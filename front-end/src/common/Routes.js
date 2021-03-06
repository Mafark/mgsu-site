import React from "react";
import {Route, Switch} from "react-router";
import HomePage from "../HomePage/HomePage";
import ProjectsList from "../ProjectsList/ProjectsList";
import ProjectDetail from "../ProjectDetail/ProjectDetail";
import NotFound from "../NotFound/NotFound";
import AdminSection from "../AdminSection/AdminSection";
import ContactsPage from "../ContactsPage/ContactsPage";
import AboutPage from "../AboutPage/AboutPage";
import GradClubPage from "../GradClubPage/GradClubPage";
import SponsorsPage from "../SponsorsPage/SponsorsPage";
import NewsPage from "../NewsPage/NewsPage";
import EventsPage from "../NewsPage/EventsPage";
import NewsDetail from '../NewsPage/components/NewsDetail'
import EventDetail from '../NewsPage/components/EventDetail'

const Routes = (props) => (
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/projects/:direction?" component={ProjectsList}/>
        <Route exact path="/project/:projectId" component={ProjectDetail}/>
        <Route exact path="/contacts" component={ContactsPage}/>
        <Route path="/about/:department?" component={AboutPage}/>
        <Route exact path="/alumni/:department?" component={GradClubPage}/>
        <Route exact path="/sponsors" component={SponsorsPage}/>
        <Route exact path="/news" render={() =>   <NewsPage {...props}/>} />
        <Route exact path="/events" render={() =>   <EventsPage {...props}/>} />
        <Route exact path="/news/:newsId" render={() =>   <NewsDetail {...props}/>} />
        <Route exact path="/events/:eventId" render={() =>   <EventDetail {...props}/>} />
        <Route path="/admin"  render={() =>   <AdminSection {...props}/>} />
        <Route component={NotFound}/>
    </Switch>
);
export default Routes;