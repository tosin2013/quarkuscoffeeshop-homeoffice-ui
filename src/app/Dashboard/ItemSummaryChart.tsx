import React from 'react';

import {
    Flex,
    FlexItem,
    Card,
    CardBody,
    CardTitle
   } from '@patternfly/react-core';

import { Chart, ChartArea, ChartAxis, ChartStack, ChartLegendTooltip, ChartThemeColor, ChartVoronoiContainer, ChartDonut, createContainer } from '@patternfly/react-charts';

export class ItemSummaryChart extends React.Component {
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
        //const { width } = this.state;
        
        // Note: Container order is important
        const CursorVoronoiContainer = createContainer("cursor", "voronoi");
        const legendData = [{ childName: 'coffee', name: 'Coffee' }, { childName: 'espresso', name: 'Espresso' }, { childName: 'food', name: 'Food' }];
        
        const data=[
            {item:"Coffee", x: 'Sunday', y: 16 },
            {item:"Coffee", x: 'Monday', y: 12 },
            {item:"Coffee", x: 'Tuesday', y: 18 },
            {item:"Coffee", x: 'Wednesday', y: 15 },
            {item:"Coffee", x: 'Thursday', y: 16 },
            {item:"Coffee", x: 'Friday', y: 20 },
            {item:"Coffee", x: 'Saturday', y: 28 },
            {item:"Espresso", x: 'Sunday', y: 4 },
            {item:"Espresso", x: 'Monday', y: 5 },
            {item:"Espresso", x: 'Tuesday', y: 7 },
            {item:"Espresso", x: 'Wednesday', y: 6 },
            {item:"Espresso", x: 'Thursday', y: 10 },
            {item:"Espresso", x: 'Friday', y: 3 },
            {item:"Espresso", x: 'Saturday', y: 5 },
            {item:"Food", x: 'Sunday', y: 8 },
            {item:"Food", x: 'Monday', y: 18 },
            {item:"Food", x: 'Tuesday', y: 14 },
            {item:"Food", x: 'Wednesday', y: 8 },
            {item:"Food", x: 'Thursday', y: 6 },
            {item:"Food", x: 'Friday', y: 8 },
            {item:"Food", x: 'Saturday', y: 12 }
            ];

            const coffeeTransactions = data.filter(i => i.item == "Coffee");
            const coffeeSum = coffeeTransactions
                        .map(i => i.y)
                        .reduce((prev, curr) => prev + curr, 0);

            const espressoTransactions = data.filter(i => i.item == "Espresso");
            const espressoSum = espressoTransactions
                        .map(i => i.y)
                        .reduce((prev, curr) => prev + curr, 0);
                        
            const foodTransactions = data.filter(i => i.item == "Food");
            const foodSum = foodTransactions
                        .map(i => i.y)
                        .reduce((prev, curr) => prev + curr, 0);
            
        return (
            <Flex justifyContent={{default:"justifyContentFlexStart"}} alignItems={{default:"alignItemsFlexStart"}}>
                <FlexItem>
                    <Card>
                        <CardTitle>Item Sales Totals</CardTitle>
                        <CardBody>
                            <div style={{  width: '350px'}}>
                                <ChartDonut
                                ariaDesc="Relative Item Sales"
                                ariaTitle="Relative Item Sales"
                                constrainToVisibleArea={true}
                                data={[{ x: 'Coffee', y: coffeeSum }, { x: 'Espresso', y: espressoSum }, { x: 'Food', y: foodSum }]}
                                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                legendData={legendData}
                                legendOrientation="vertical"
                                legendPosition="right"
                                padding={{
                                    bottom: 0,
                                    left: 5,
                                    right: 120, // Adjusted to accommodate legend
                                    top: 0
                                }}
                                subTitle="Last Week"
                                title={coffeeSum + espressoSum + foodSum}
                                themeColor={ChartThemeColor.multiOrdered}
                                width={350}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </FlexItem>
                <FlexItem>
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
                                width={700}
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


                </FlexItem>
            </Flex>    
        );
      }
    }