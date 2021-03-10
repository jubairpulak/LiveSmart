import axios from "axios";

export const getOrder = async (sort, order, page, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/order`,
		{ sort, order, page },
		{
			headers: { authtoken },
		}
	);
export const getOrderbySearchDate = async (
	sort,
	order,
	epocdate,
	endepocdate,
	authtoken
) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/searchorder`,
		{ sort, order, epocdate, endepocdate },
		{
			headers: { authtoken },
		}
	);

export const getsingleOrder = async (orderId, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/singleorder`,
		{ orderId },
		{
			headers: { authtoken },
		}
	);
export const getAllUsers = async (email, sort, order, page, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/userlist`,
		{ email, sort, order, page },
		{
			headers: { authtoken },
		}
	);
export const getallmails = async (email, authtoken, sort, order, page) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/mails`,
		{ email, sort, order, page },
		{
			headers: { authtoken },
		}
	);
export const updatedata = async (email, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/mails/checkmail`,
		{ email },
		{
			headers: { authtoken },
		}
	);
export const updateinfo = async (email, replieddata, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/mail/checkmail`,
		{ email, replieddata },
		{
			headers: { authtoken },
		}
	);
export const UpdateUsertToAdmin = async (email, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/admin/makeadmin`,
		{ email },
		{
			headers: { authtoken },
		}
	);
export const updateStatus = async (orderId, orderStatus, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/admin/orderstatus`,
		{ orderId, orderStatus },
		{
			headers: { authtoken },
		}
	);

export const getproductsadmin = async (authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/showchart`,
		{},
		{
			headers: { authtoken },
		}
	);
export const getmailByCount = async () =>
	await axios.get(`${process.env.REACT_APP_API}/mails/total`);

export const getUserCount = async () =>
	await axios.get(`${process.env.REACT_APP_API}/users/total`);
export const getOrderCount = async () =>
	await axios.get(`${process.env.REACT_APP_API}/order/total`);
