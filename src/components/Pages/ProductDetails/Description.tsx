import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type DescriptionProps = {
    description:string,
    video:string,
    displayDescription:boolean,
    displayVideo:boolean
}

export default function Description(props:DescriptionProps) {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {props.displayDescription&&<Tab label={t("description")} {...a11yProps(0)} />}
          {/* {props.displayVideo&&<Tab label={t('video')} {...a11yProps(1)} />} */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {props.description}
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        {props.video}
      </TabPanel> */}
    </Box>
  );
}