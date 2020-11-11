import * as React from 'react';

import {
    PageSection,
    PageSectionVariants,
    Text,
    TextContent,
    Divider,
    Gallery, 
    GalleryItem
   } from '@patternfly/react-core';

import { 
  CheckCircleIcon
} from '@patternfly/react-icons';

import { ItemSummaryChart } from './ItemSummaryChart';
import { ServerComparisonChart } from './ServerComparisonChart'

export class Dashboard extends React.Component{
    constructor(props) {
      super(props);
    }

    public render() {
        return (
            <React.Fragment>
            <PageSection variant={PageSectionVariants.light}>

              <Gallery hasGutter>
              <GalleryItem>
              <TextContent>
                <Text component="h1">Dashboard</Text>
              </TextContent>
              </GalleryItem>
              <GalleryItem>
                <CheckCircleIcon color="green"></CheckCircleIcon>&nbsp;
                 Sales
                </GalleryItem>
              <GalleryItem>
                <CheckCircleIcon color="green"></CheckCircleIcon>&nbsp;
                OrderUp
                </GalleryItem>
              <GalleryItem>
                <CheckCircleIcon color="green"></CheckCircleIcon>&nbsp;
                Inventory
              </GalleryItem>
              </Gallery>

            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.default}>
              <ServerComparisonChart />
            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.default}>
              <ItemSummaryChart />
            </PageSection>
        </React.Fragment>     
        )
    }
}
