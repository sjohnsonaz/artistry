declare var window: any;

import React from 'react';
import { createRoot } from 'react-dom/client';

import {
    Container,
    BodyScroll,
    DepthStack,
    Portal,
} from '../../modules/ArtistryReact';

import ButtonView from './views/button/ButtonView';
import RangeView from './views/range/RangeView';
import ToggleView from './views/toggle/ToggleView';
import CalendarView from './views/calendar/CalendarView';
import ProgressBarView from './views/progressBar/ProgressBarView';
import MenuBarView from './views/menuBar/MenuBarView';
import ModalView from './views/modal/ModalView';
import SectionView from './views/section/SectionView';
import CarouselView from './views/carousel/CarouselView';
import TabView from './views/tab/TabView';
import TableView from './views/table/TableView';
import PagerView from './views/pager/PagerView';
import ListView from './views/list/ListView';
import ScrollableView from './views/scrollable/ScrollableView';
import FormView from './views/form/FormView';
import FileUploadView from './views/file-upload/FileUploadView';
import CodeView from './views/code/CodeView';
import DrawerView from './views/drawer/DrawerView';
import GridView from './views/grid/GridView';
import CardView from './views/card/CardView';
import NotificationView from './views/notification/NotificationView';

export default class Application {
    static run() {
        const container = document.getElementById('layer-root');
        if (!container) {
            throw new Error('no container element');
        }
        BodyScroll.init();
        DepthStack.init();
        Portal.addElement('layer-fixed', 'layer-fixed');
        Portal.addElement('layer-overlay', 'layer-overlay');
        Portal.addElement('layer-flyout', 'layer-flyout');
        const root = createRoot(container);
        root.render(
            <Container menuBarTop screenSize="all">
                <MenuBarView />
                <h2>Components</h2>
                <ButtonView />
                <RangeView />
                <ToggleView />
                <CalendarView />
                <ProgressBarView />
                <ModalView />
                <DrawerView />
                <SectionView />
                <CarouselView />
                <TabView />
                <TableView />
                <PagerView />
                <ListView />
                <ScrollableView />
                <FormView />
                <FileUploadView />
                <CodeView />
                <GridView />
                <CardView />
                <NotificationView />
            </Container>
        );
    }
}
