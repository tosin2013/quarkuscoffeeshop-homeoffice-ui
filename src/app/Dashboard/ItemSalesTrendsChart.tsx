import React from 'react';

import {
    Card,
    CardBody,
    CardTitle
   } from '@patternfly/react-core';

import { 
  Chart, 
  ChartArea, 
  ChartAxis, 
  ChartStack, 
  ChartLegendTooltip, 
  ChartThemeColor, 
  createContainer 
} from '@patternfly/react-charts';

import { gql, useQuery } from '@apollo/client';

const GET_ORDERS = gql`
query orders {
    orders {
      id
      locationId
      lineItems {
        id
        item
        price
        preparedBy
      }
      total,
      orderPlacedTimestamp,
      orderCompletedTimestamp
    }
  }
`;

export class ItemSalesTrendsChart extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
          width: 0
        };
        this.handleResize = () => {
          if(this.containerRef.current && this.containerRef.current.clientWidth){
            this.setState({ width: this.containerRef.current.clientWidth *.6 });
          }
        };
      }
    
      
      componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
      }
    
      render() {
        
        const CursorVoronoiContainer = createContainer("cursor", "voronoi");
        const legendData = [{ childName: 'coffee', name: 'Coffee' }, { childName: 'espresso', name: 'Espresso' }, { childName: 'food', name: 'Food' }];

        const localData=[
            {item:"Coffee", x: 'Saturday', y: 28 },
            {item:"Coffee", x: 'Sunday', y: 16 },
            {item:"Coffee", x: 'Monday', y: 12 },
            {item:"Coffee", x: 'Tuesday', y: 18 },
            {item:"Coffee", x: 'Wednesday', y: 15 },
            {item:"Coffee", x: 'Thursday', y: 16 },
            {item:"Coffee", x: 'Friday', y: 30 },
            {item:"Espresso", x: 'Saturday', y: 5 },
            {item:"Espresso", x: 'Sunday', y: 4 },
            {item:"Espresso", x: 'Monday', y: 5 },
            {item:"Espresso", x: 'Tuesday', y: 7 },
            {item:"Espresso", x: 'Wednesday', y: 6 },
            {item:"Espresso", x: 'Thursday', y: 10 },
            {item:"Espresso", x: 'Friday', y: 13 },
            {item:"Food", x: 'Saturday', y: 12 },
            {item:"Food", x: 'Sunday', y: 8 },
            {item:"Food", x: 'Monday', y: 18 },
            {item:"Food", x: 'Tuesday', y: 14 },
            {item:"Food", x: 'Wednesday', y: 8 },
            {item:"Food", x: 'Thursday', y: 6 },
            {item:"Food", x: 'Friday', y: 20 }
            ];

            const coffeeTransactions = localData.filter(i => i.item == "Coffee");
            const coffeeSum = coffeeTransactions
                        .map(i => i.y)
                        .reduce((prev, curr) => prev + curr, 0);

            const espressoTransactions = localData.filter(i => i.item == "Espresso");
            const espressoSum = espressoTransactions
                        .map(i => i.y)
                        .reduce((prev, curr) => prev + curr, 0);
                        
            const foodTransactions = localData.filter(i => i.item == "Food");
            const foodSum = foodTransactions
                        .map(i => i.y)
                        .reduce((prev, curr) => prev + curr, 0);
            
        return (
                    <Card>
                    <CardTitle>Item Sales Trends</CardTitle>
                        <CardBody>
                            <Chart
                                ariaDesc="Item Sales"
                                ariaTitle="Item Sales Chart"
                                containerComponent={
                                <CursorVoronoiContainer
                                    cursorDimension="x"
                                    labels={({ datum }) => `${datum.y !== null ? datum.y : 'no data'}`}
                                    labelComponent={<ChartLegendTooltip legendData={legendData} title={(datum) => datum.x}/>}
                                    mouseFollowTooltips
                                    voronoiDimension="x"
                                    voronoiPadding={50}
                                />
                                }
                                legendData={legendData}
                                legendPosition="bottom-left"
                                height={230}
                                padding={{
                                bottom: 75, // Adjusted to accomodate legend
                                left: 35,
                                right: 30,
                                top: 0,
                                }}
                                //maxDomain={{y: 50}}
                                themeColor={ChartThemeColor.multiOrdered}
                                width={600}
                            >
                                <ChartAxis />
                                <ChartAxis dependentAxis showGrid />
                                <ChartStack>
                                <ChartArea
                                    data={coffeeTransactions}
                                    interpolation="monotoneX"
                                    name="coffee"
                                />
                                <ChartArea
                                data={espressoTransactions}
                                    interpolation="monotoneX"
                                    name="espresso"
                                />
                                <ChartArea
                                    data={foodTransactions}
                                    interpolation="monotoneX"
                                    name="food"
                                />
                                </ChartStack>
                            </Chart>
                        </CardBody>
                    </Card>
        );
      }
    }