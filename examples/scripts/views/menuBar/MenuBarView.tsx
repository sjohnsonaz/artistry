import * as React from 'react';

import { MenuBar, MenuBarLink, UserThumbnail, Spacer } from 'modules/ArtistryReact';

export interface IMenuBarViewProps {

}

export interface IMenuBarViewState {
    userMenuOpen: boolean;
}

export default class MenuBarView extends React.Component<IMenuBarViewProps, IMenuBarViewState> {
    constructor(props?: IMenuBarViewProps) {
        super(props);
        this.state = {
            userMenuOpen: false
        };
    }

    toggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        this.setState({ userMenuOpen: !this.state.userMenuOpen });
    }

    closeUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        this.setState({ userMenuOpen: false });
    }
    render() {
        return (
            <MenuBar
                top
                title="React Artistry"
            >
                <MenuBarLink
                    active
                    title="Home"
                    href="#"
                />
                <Spacer />
                <MenuBarLink
                    noLink
                    title={
                        <UserThumbnail
                            src="https://placebear.com/50/50"
                            placeholder="C"
                            size="small"
                            popover={"Logout"}
                            popoverDirection="bottom"
                            popoverAlign="right"
                            popoverSpace
                        />
                    }
                />
                <MenuBarLink
                    noLink
                    title={
                        <UserThumbnail
                            src=""
                            placeholder="C"
                            size="small"
                            onClick={this.toggleUserMenu}
                            popover={"Logout"}
                            popoverDirection="bottom"
                            popoverAlign="right"
                            popoverMenu
                            popoverSpace
                            popoverOpen={this.state.userMenuOpen}
                            menuBarTop
                            onPopoverClose={this.closeUserMenu}
                        />
                    }
                />
            </MenuBar>
        );
    }
}
