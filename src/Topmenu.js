import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import SimpleDialog from './SimpleDialog';
import { deleteItem, makeActive, setActiveMenu } from './store/slice';

function CustomTabPanel(props) {
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

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    key: `${index}`,
    id: `tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Topmenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [tabs, setTabs] = React.useState([]);
  const [listmenu, setListMenu] = React.useState([]);
  const topMenuCount = useSelector((state) => state.topMenuCount);
  const menuItems = useSelector((state) => state.menuItems);
  const setActive = useSelector((state) => state.activeMenu);
  const [value, setValue] = React.useState(setActive);
  const inputRef = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTabs((prev) => (prev = menuItems.slice(0, topMenuCount)));
    setListMenu(
      (prev) => (prev = menuItems.slice(topMenuCount, menuItems.length))
    );
    console.log(tabs, listmenu);
    if (menuItems.length) {
      // setValue(0);

      if (menuItems.length > 3) {
        dispatch(setActiveMenu(topMenuCount - 1));
      } else {
        dispatch(setActiveMenu(menuItems.length - 1));
      }
      if (menuItems.length < 3) {
      }
    } else {
      // setValue(false);
      dispatch(setActiveMenu(false));
    }
  }, [menuItems]);

  // React.useEffect(() => {
  //   console.log(setActive);
  //   setValue(setActive);
  // }, [setActive]);

  const handleChange = (event, newValue) => {
    if (event.currentTarget.id === 'tab-11') {
      setAnchorEl(event.currentTarget);
    } else if (event.currentTarget.id === 'tab-12') {
      inputRef.current.openDialog();
      // setValue(false);
      // dispatch(setActiveMenu(false));
    } else {
      // setValue(newValue);
      dispatch(setActiveMenu(newValue));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={setActive}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((item, keyindex) =>
            keyindex < topMenuCount ? (
              <Tab label={item} {...a11yProps(keyindex)} />
            ) : null
          )}
          {menuItems.length > topMenuCount ? (
            <Tab label="More" {...a11yProps(11)} />
          ) : null}
          <Tab label="Add new" {...a11yProps(12)} />
        </Tabs>
      </Box>
      {tabs.map((item, keyindex) => (
        <CustomTabPanel value={setActive} index={keyindex} key={keyindex}>
          {item}
          <Button
            variant="text"
            onClick={() => {
              dispatch(deleteItem(item));
              if (tabs.length < 0) {
                // setValue(false);
                // dispatch(setActiveMenu(false));
              }
            }}
          >
            Del
          </Button>
        </CustomTabPanel>
      ))}
      <CustomTabPanel value={setActive} index={12} key={12}>
        'asdf'
      </CustomTabPanel>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          {listmenu.map((item, keyindex) => (
            <ListItem
              key={keyindex}
              index={keyindex}
              onClick={() => {
                dispatch(makeActive(item));
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Popover>
      <SimpleDialog ref={inputRef} />
    </Box>
  );
}
