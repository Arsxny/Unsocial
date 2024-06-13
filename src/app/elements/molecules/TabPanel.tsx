"use client";

import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { TabComponentType, TabProps } from '../../types';
import { tabStyles } from '../organisms/SideBar/TabStyles';

const TabPanel = (props: TabProps) =>  {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const TabComponent: React.FC<TabComponentType> = (props) => {
    const [tabIndex, setTabIndex] = useState(0);
  
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    };

    const {headerHeight} = props;
  
    return (
      <Box sx={{ width: '100%', typography: 'body1',  }}>
        <Box sx={{ borderBottomWidth: 0.25, borderColor: '#333', position: 'sticky', top: headerHeight + 1, backgroundColor: '#000000'}}>
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                centered
                role="navigation"
                TabIndicatorProps={{ hidden: true }}
            >
            <Tab 
                disableRipple
                label="Browse" 
                sx={tabStyles}/>
            <Tab 
                disableRipple
                label="Following" 
                sx={tabStyles}/>
            </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
            Browse your Feed
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          See Following Posts
        </TabPanel>
      </Box>
    );
  };
  
  export default TabComponent;