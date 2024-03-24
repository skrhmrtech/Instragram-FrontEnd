import React, { useEffect, useState } from 'react'
import { getMe } from '../../features/user/UserProfile';
import { AllUser, performActionFollowRequest, sendFollowRequest } from '../../features/user/getAllUser';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function RenderPADBButton({ userID }) {
    const dispatch = useDispatch();

    const [currentUserActionType, setCurrentUserActionType] = useState("");
    const [currentUserActionConnection, setCurrentUserActionConnection] = useState([]);

    const currentUser = useSelector((state) => state.userProfile.userProfile)[0] || [];
    const receiverUser = useSelector(state => state.getAllUser.receiverUser);
    const requestedUser = useSelector(state => state.getAllUser.requestedUser);
    const getAllUser = useSelector(state => state.getAllUser.getAllUser);

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
        }

        setCurrentUserActionType(status);
        setCurrentUserActionConnection(connection);
    }, [userID, receiverUser, requestedUser, getAllUser, currentUser.id])

    const followRequestHandler = async (value) => {
        await dispatch(sendFollowRequest(value));
        updateStatus();
    }

    const performActionRequest = async (id, status) => {
        await dispatch(performActionFollowRequest({ id, status }));
        updateStatus();
    }

    const updateStatus = async () => {
        await dispatch(AllUser());
        await dispatch(getMe());
    }

    return (
        <Box>
            {
                (currentUserActionType === "Followers" || currentUserActionType === "Following")
                    ?
                    <>
                        {
                            (currentUserActionType === "Following")
                                ?
                                <Box>
                                    {
                                        (currentUserActionConnection.status === "pending" && <Button variant='outlined'>Pendding</Button>) ||
                                        (currentUserActionConnection.status === "accepted" && <Button variant='contained' color='success'>{currentUserActionType}</Button>) ||
                                        (currentUserActionConnection.status === "declined" && <Button variant='contained' color='warning'>Declined</Button>)
                                    }
                                </Box>
                                :
                                (currentUserActionConnection.status === "pending")
                                    ?
                                    (
                                        <Box display={"flex"}>
                                            <Box marginX={1}>
                                                <Button variant='outlined' color='success' onClick={() => { performActionRequest(userID, "accepted") }}><CheckIcon /></Button>
                                            </Box>
                                            <Box marginX={1}>
                                                <Button variant='outlined' color='warning' onClick={() => { followRequestHandler(userID) }}><CloseIcon /></Button>
                                            </Box>
                                        </Box>
                                    )
                                    :
                                    (
                                        <Box>
                                            {
                                                (currentUserActionConnection.status === "pending" && <Button variant='outlined'>Pendding</Button>) ||
                                                (currentUserActionConnection.status === "accepted" && <Button variant='contained' color='success'>{currentUserActionType}</Button>) ||
                                                (currentUserActionConnection.status === "declined" && <Button variant='contained' color='warning'>Declined</Button>)
                                            }
                                        </Box>
                                    )
                        }
                    </>
                    :
                    (currentUser.id === userID)
                        ?
                        <Button>
                            You
                        </Button>
                        :
                        (currentUserActionType === "Friends")
                            ?
                            <Button variant="contained" color='success' onClick={() => { followRequestHandler(userID) }}>
                                Friends
                            </Button>
                            :
                            (currentUserActionType === "FollowBack")
                                ?
                                <Button variant="contained" onClick={() => { followRequestHandler(userID) }}>
                                    Follow Back
                                </Button>
                                :
                                <Button variant="contained" onClick={() => { followRequestHandler(userID) }}>
                                    Follow
                                </Button>
            }
        </Box>
    )
}

export default RenderPADBButton
