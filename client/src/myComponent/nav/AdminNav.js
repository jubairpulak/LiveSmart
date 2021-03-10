import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexGrow: 1,
	},
	paper: {
		marginRight: theme.spacing(8),
	},
	control: {
		padding: theme.spacing(2),
	},
}));

const AdminNav = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};
	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<nav className="navbar-light " aria-label="breadcrumb">
					<Menu mode="inline">
						<MenuList className="nav flex-column">
							<MenuItem className="nav-item">
								<Link
									to="/admin/dashboard"
									className="nav-link active">
									Dashbaord
								</Link>
							</MenuItem>

							<MenuItem className="nav-item">
								<Link
									to="/admin/product"
									className="nav-link">
									Product
								</Link>
							</MenuItem>

							<MenuItem className="nav-item">
								<Link
									to="/admin/products"
									className="nav-link">
									Products
								</Link>
							</MenuItem>

							<MenuItem className="nav-item">
								<Link
									to="/admin/category"
									className="nav-link">
									Category
								</Link>
							</MenuItem>

							<MenuItem className="nav-item">
								<Link
									to="/admin/sub"
									className="nav-link">
									Sub Category
								</Link>
							</MenuItem>

							<MenuItem className="nav-item">
								<Link
									to="/admin/userlist"
									className="nav-link">
									Check User List
								</Link>
							</MenuItem>
							<MenuItem className="nav-item">
								<Link
									to="/admin/checkmail"
									className="nav-link">
									Check Feedback List
								</Link>
							</MenuItem>

							<MenuItem className="nav-item">
								<Link
									to="/admin/singleorder"
									className="nav-link">
									Single Order Check
								</Link>
							</MenuItem>
							<MenuItem className="nav-item">
								<Link
									to="/admin/coupon"
									className="nav-link">
									Cupon
								</Link>
							</MenuItem>
							<MenuItem className="nav-item">
								<Link
									to="/admin/showchart"
									className="nav-link">
									Show Report
								</Link>
							</MenuItem>

							<MenuItem className="nav-item">
								<Link
									to="/admin/password"
									className="nav-link">
									Password
								</Link>
							</MenuItem>
						</MenuList>
					</Menu>
				</nav>
			</Paper>
		</div>
	);
};

export default AdminNav;
