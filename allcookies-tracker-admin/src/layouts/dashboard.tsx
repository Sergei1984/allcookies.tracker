import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import AppBar from "../components/app-bar";
import AppDrawer from "../components/app-drawer/app-drawer";
import DrawerHeader from "../components/app-drawer/drawer-header";
import Main from "../components/main";
import {RootStore} from "../store/rootStore";
import {errorUserAction} from "../store/users/actions";
import Snackbar from "@mui/material/Snackbar";

const drawerWidth = 240;

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout = ({children}: DashboardLayoutProps): JSX.Element => {
	const dispatch = useDispatch()
	const [alert, setAlert] = React.useState(false);
	const Alert = useSelector((state: RootStore) => state.alertStore.errorData);

	const handleClick = () => {
		setAlert(true);
	};

	const handleClose = async (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		await dispatch(errorUserAction({error: false, message: ''}))
		setAlert(false);

	};

	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small"/>
			</IconButton>
		</React.Fragment>
	);

	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{display: "flex"}}>
			<CssBaseline/>
			<AppBar position="fixed" open={open} drawerwidth={drawerWidth}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							mr: 2,
							...(open && {display: "none"}),
						}}
					>
						<MenuIcon sx={{color: "#42A6A6"}}/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<AppDrawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				drawerwidth={drawerWidth}
				variant="persistent"
				anchor="left"
				isOpen={open}
				handleDrawerClose={handleDrawerClose}
			/>
			<Main open={open} drawerwidth={drawerWidth}>
				<DrawerHeader/>
				{children}
			</Main>
			<Snackbar
				open={alert}
				autoHideDuration={3000}
				onClose={handleClose}
				message={Alert.message}
				action={action}
			/>
		</Box>
	);
};

export default DashboardLayout;
