import * as React from 'react';

import {
    PageSection,
    PageSectionVariants,
    Text,
    TextContent,
    Divider,
    Stack, 
    StackItem,
    LabelGroup,
    Label,
    Flex,
    FlexItem,
   } from '@patternfly/react-core';

import { 
  CheckCircleIcon,
  InfoCircleIcon
} from '@patternfly/react-icons';

import { ItemSummaryChart } from './ItemSummaryChart';
import { ServerComparisonChart } from './ServerComparisonChart'
import { AverageOrderTimeChart } from './AverageOrderTimeChart'

export class Dashboard extends React.Component{
    constructor(props) {
      super(props);
    }

    public render() {
        return (
            <React.Fragment>
            <PageSection variant={PageSectionVariants.light}>

            <Stack hasGutter>
              <StackItem>
                <TextContent>
                  <Text component="h1">Dashboard</Text>
                </TextContent>
              </StackItem>
              <StackItem>
                <LabelGroup categoryName="Key Metrics">
                  <Label icon={<CheckCircleIcon />} color="green">OrderUp</Label>
                  <Label icon={<CheckCircleIcon />} color="green">Sales</Label>
                  <Label icon={<CheckCircleIcon />} color="green">Inventory</Label>
                </LabelGroup>
              </StackItem>
            </Stack>



            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.default}>
            <Flex>
            
                <FlexItem>
                  <ServerComparisonChart />
                </FlexItem>

                <FlexItem>
                  <AverageOrderTimeChart />
                </FlexItem>
                
            </Flex>
            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.default}>
              <ItemSummaryChart />
            </PageSection>
        </React.Fragment>     
        )
    }
}
