import * as React from 'react';
import * as AutoMerge from 'automerge';
import { List } from './List';

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
    return (
        <div>
            <List />
        </div>
    );
};
