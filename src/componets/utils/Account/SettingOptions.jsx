import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { UpdateStatus, getMe, logoutUserData } from "../../../features/user/UserProfile";
import { logoutAllUserData } from "../../../features/user/getAllUser";
import { logoutAllPostData } from "../../../features/post/FollowerFollowingPost";
import { logoutSingleUserData } from "../../../features/user/getSingleUser";
import { logoutSinglePostData } from "../../../features/post/getSinglePost";
import { Switch } from 'antd';
import { Box } from '@mui/material';

function MenuSection({ children, label }) {
    return (
        <MenuSectionRoot role="group">
            <MenuSectionLabel>{label}</MenuSectionLabel>
            <ul>{children}</ul>
        </MenuSectionRoot>
    );
}

MenuSection.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
};

export default function SettingOptions({ userProfileStatus }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const LogoutHandler = async () => {
        localStorage.removeItem("jwtToken");
        dispatch(logoutUserData());
        dispatch(logoutAllUserData());
        dispatch(logoutAllPostData());
        dispatch(logoutSingleUserData());
        dispatch(logoutSinglePostData());

        toast.success("You have logged out.", {
            position: "top-center"
        });

        setTimeout(() => {
            navigate("/");
        }, 1000);
    };

    const isPublicHandler = async () => {
        await dispatch(UpdateStatus());
        await dispatch(getMe());
    }

    return (
        <Box>
            <Dropdown open={open}>
                <MenuButton onClick={() => { (open) ? setOpen(false) : setOpen(true) }}><SettingsIcon /></MenuButton>
                <Menu slots={{ listbox: Listbox }}>
                    <MenuSection label="Profile">
                        <MenuItem>
                            <Box display={"flex"}>
                                <Box paddingRight={3}>
                                    <Switch defaultChecked={userProfileStatus} onChange={isPublicHandler} />
                                </Box>
                                {
                                    (userProfileStatus) ? "Public" : "Private"
                                }
                            </Box>
                        </MenuItem>
                    </MenuSection>
                    <MenuSection label="Logout">
                        <MenuItem onClick={LogoutHandler} className="cursorPointer">
                            <Box display={"flex"}>
                                <Box paddingRight={5}>
                                    <LogoutIcon />
                                </Box>
                                Logout
                            </Box>
                        </MenuItem>
                    </MenuSection>
                </Menu>
            </Dropdown>
        </Box>
    );
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

const MenuSectionRoot = styled('li')`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled('span')`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;
