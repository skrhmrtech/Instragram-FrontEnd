import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SingleUser } from '../../features/user/getSingleUser';
import AccountTop from './OtherAccount/AccountTop';
import AccountBottom from './OtherAccount/AccountBottom';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardBottomNavigation from './DashboardBottomNavigation';
import { AllUser } from '../../features/user/getAllUser';
import { Vortex } from 'react-loader-spinner';
import { setNavigate } from '../../features/navigation/Navigation';

function OtherUser({ Preload, setPreload }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentNavigation = useSelector(state => state.navigate.navigate);
    const currentUser = useSelector((state) => state.userProfile.userProfile);

    const { userID } = useParams();
    const [update, setUpdate] = useState(1);

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate("/");
        }
    }, [currentNavigation, userID, navigate, dispatch]);

    if (currentNavigation === "home" || currentNavigation === "search" || currentNavigation === "addpost" || currentNavigation === "notification" || currentNavigation === "account" || currentUser[0]?.id === parseInt(userID)) {
        if (currentUser[0]?.id === parseInt(userID)) {
            dispatch(setNavigate("account"));
        }
        navigate("/Dashboard");
    }

    const userData = useSelector(state => state.singleUser.getSingleUser);

    const receiverUser = useSelector(state => state.getAllUser.receiverUser);
    const requestedUser = useSelector(state => state.getAllUser.requestedUser);
    const getAllUser = useSelector(state => state.getAllUser.getAllUser);
    const [currentUserActionType, setCurrentUserActionType] = useState("");
    const [currentUserActionConnection, setCurrentUserActionConnection] = useState([]);

    let counter = 0;
    useEffect(() => {
        if ((counter === 1) || (update >= 1)) {
            const getSingleUserData = async () => {
                dispatch(AllUser());
                let response = await dispatch(SingleUser(userID));
                if (response.payload.error === true || !response) {
                    navigate("/Dashboard");
                }
            }
            getSingleUserData();
        }
        counter++;
    }, [userID, update, counter, navigate, dispatch]);

    useEffect(() => {
        let status = "Followers";
        let connection = receiverUser.find((singleUser) => {
            return singleUser.sender_user.id === parseInt(userID);
        }) || [];

        if (connection.length === 0) {
            status = "Following";
            connection = requestedUser.find((singleUser) => {
                return singleUser.receiver_user.id === parseInt(userID);
            }) || [];
        }

        if (connection.length === 0) {
            status = "AllUsers";
            connection = getAllUser.find((singleUser) => {

                let checkFollowings = singleUser?.following.find((checkUser) => {
                    return checkUser.sender_id === parseInt(userID) && checkUser.status === "accepted" && checkUser.receiver_id === parseInt(currentUser.id);
                })
                if (checkFollowings) {
                    status = "FollowBack";
                }

                return singleUser.id === parseInt(userID);
            }) || [];
        }

        if (connection.length === 0) {
            status = "Friends";
            connection["status"] = "accepted";
            connection["isPublic"] = true;
        }

        setCurrentUserActionType(status);
        setCurrentUserActionConnection(connection);
    }, [userID, receiverUser, requestedUser, getAllUser, currentUser.id])

    useEffect(() => {
        !(userData.length === 0) ? setPreload(false) : setPreload(true);
    }, [userData, setPreload])

    return (
        <Box width={"100%"} height={"100%"}>
            <Container style={{ width: "100%", height: "100%" }}>
                <Box width={"100%"} height={"100%"}>
                    <Box
                        border={"solid"}
                        height={"calc(100% - 77px)"}
                        borderColor={"#E73B6E"}
                        marginY={"5px"}
                        borderRadius={"25px 25px 0px 0px"}
                        paddingY={2}
                        position={"relative"}
                        overflow={"hidden"}
                    >
                        <Box height={"100%"} overflow={"auto"}>
                            <Box width={"100%"} height={"100%"} display={(Preload) ? "flex" : "none"} justifyContent={"center"} alignItems={"center"} bgcolor={"rgba(0,0,0,.8)"} position={"absolute"} top={0} left={0} zIndex={1}>
                                <Vortex
                                    visible={true}
                                    height="100"
                                    width="100"
                                    ariaLabel="vortex-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="vortex-wrapper"
                                    colors={['#E73B6E', '#A800EE', '#FF00C6', '#E73B6E', '#A800EE', '#FF00C6']}
                                />
                            </Box>
                            <Box>
                                <Box margin={3}>
                                    {Array.isArray(userData) && !(userData.length === 0) ? (
                                        <Box margin={3}>

                                            <AccountTop userProfile={userData[0]} currentStatus={currentUserActionType} currentConnection={currentUserActionConnection} />
                                            {
                                                ((currentUserActionType === "Followers" || currentUserActionType === "Following" || currentUserActionType === "Friends") && currentUserActionConnection.status === "accepted") || currentUserActionConnection?.receiver_user?.isPublic === true || currentUserActionConnection?.sender_user?.isPublic === true || currentUserActionConnection?.isPublic === true
                                                    ?
                                                    <AccountBottom userProfile={userData[0]} updateProfile={() => { setUpdate(update + 1) }} />
                                                    :
                                                    <h2>
                                                        <b>
                                                            This user account is Private.
                                                        </b>
                                                    </h2>
                                            }
                                        </Box>
                                    ) : (
                                        "Loading..."
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <DashboardBottomNavigation
                        currentNavigation={currentNavigation}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default OtherUser
