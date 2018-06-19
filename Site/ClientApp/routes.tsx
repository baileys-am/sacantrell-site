import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Projects } from './components/Projects';
import { Blackjack } from './components/Blackjack';
import { About } from './components/About';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/projects' component={ Projects } />
    <Route path='/projects/blackjack' component={ Blackjack } />
    <Route path='/about' component={ About } />
</Layout>;
