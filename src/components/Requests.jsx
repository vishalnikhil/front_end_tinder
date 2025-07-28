// src/components/Requests.js
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { addRequests } from '../utils/requestSlice'; // Make sure this action is correctly defined
// Removed: import RequestCard from './RequestCard'; // No longer importing a separate component

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests); // Assuming 'requests' is an array in your store

    // console.log(requests);
    const navigate = useNavigate();

    const handleclick = async (status, _id) => { // _id here will be the request's _id
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true,
            });
            console.log(`Request ${_id} status updated to ${status}:`, res.data);
            // After successfully updating the status, you might want to:
            // 1. Re-fetch all requests to update the list:
            // fetchRequests();
            // 2. Or, more efficiently, remove the updated request from the Redux store
            //    (you'd need a 'removeRequest' action in your requestSlice for this)
            // dispatch(removeRequest(_id));
        } catch (err) {
            console.error("Error updating request status:", err);
            // navigate('/login'); // Only navigate if it's an authentication error
        }
    }

    // useEffect hook to fetch requests when the component mounts
    useEffect(() => {
        const fetchRequests = async () => {
            // Only fetch if 'requests' is not yet populated
            if (requests && requests.length > 0) {
                console.log("Requests Component: Requests already in store, skipping fetch.");
                return;
            }

            try {
                const res = await axios.get(BASE_URL + "/user/requests/recieved", {
                    withCredentials: true,
                });

                console.log("Requests Component: Fetched requests data:", res.data);
                dispatch(addRequests(res.data)); // Dispatch the fetched data to Redux
            } catch (err) {
                console.error("Requests Component: Error fetching requests:", err);
                // If there's an error (e.g., not authenticated), navigate to login
                // navigate("/login"); // Uncomment if you want to redirect on any fetch error
            }
        };

        console.log("Requests Component: Running useEffect to fetch requests.");
        fetchRequests();
    }, [requests, dispatch, navigate]); // Dependencies: requests (to re-run if it changes from empty),
    // dispatch (stable), navigate (stable)

    // --- Conditional Rendering Logic ---

    // 1. Loading State: If requests is null (initial state from reducer if not [])
    // or if it's an empty array and data is still being fetched.
    if (!requests) {
        console.log("Requests Component: Displaying loading state (requests is null).");
        return (
            <div className='flex justify-center items-center h-screen'>
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="ml-4 text-lg text-gray-700">Loading requests...</p>
            </div>
        );
    }

    // 2. No Requests Found: If requests is an empty array after fetching
    // This means the API call was successful but returned no data.
    if (requests.length === 0) {
        console.log("Requests Component: Displaying 'No requests found' state.");
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className="text-xl text-gray-700">No new requests received.</p>
            </div>
        );
    }

    // 3. Display Requests: If requests array contains data
    console.log("Requests Component: Displaying received requests.");
    return (
        <div className='flex flex-wrap justify-center p-4'>
            {requests.map((requestItem) => {
                // Safely access nested properties from fromUserId
                const { fromUserId } = requestItem;
                const userDetails = fromUserId || {}; // Default to empty object if fromUserId is null/undefined

                // Destructure properties from userDetails with default values for safety
                const {
                    firstName = "N/A",
                    lastName = "N/A",
                    age = "N/A", // This will be N/A if not in data
                    skills = [], // Ensure skills is an array
                    profilePicture = "https://placehold.co/150x150/aabbcc/ffffff?text=User" // Placeholder image
                } = userDetails;

                return (
                    // Inlined RequestCard JSX directly here
                    <div key={requestItem._id} className="card bg-base-100 w-80 shadow-xl rounded-lg overflow-hidden m-4 transform transition duration-300 hover:scale-105">
                        <figure className="h-48 w-full overflow-hidden">
                            <img
                                src={profilePicture}
                                alt={`${firstName} ${lastName}'s profile`}
                                className="object-cover w-full h-full"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/aabbcc/ffffff?text=User"; }} // Fallback on error
                            />
                        </figure>
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl font-bold text-primary mb-2">
                                {firstName} {lastName}
                            </h2>
                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Age:</span> {age}
                            </p>
                            <div className="mb-4">
                                <p className="font-semibold text-gray-600 mb-1">Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    {skills.length > 0 ? (
                                        skills.map((skill, index) => (
                                            <span key={index} className="badge badge-outline badge-primary px-3 py-1 text-sm rounded-full">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 text-sm">No skills listed.</span>
                                    )}
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-4 gap-2">
                                <button
                                    // --- CORRECTED LINE HERE ---
                                    onClick={() => handleclick("accepted", requestItem._id)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all duration-200"
                                >
                                    ✅ Accept
                                </button>
                                <button
                                    // --- CORRECTED LINE HERE ---
                                    onClick={() => handleclick("rejected", requestItem._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all duration-200"
                                >
                                    ❌ Reject
                                </button>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Requests;
