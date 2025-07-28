import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return null;

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Connections</h1>

      {connections.length === 0 ? (
        <div className="text-gray-400">No connections found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((user, idx) => {
            const fullName = `${user.firstName} ${user.lastName}`;
            const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&color=fff`;

            return (
              <div
                key={idx}
                className="bg-gray-800 shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-200 border border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={avatarURL}
                    alt="Avatar"
                    className="w-14 h-14 rounded-full border border-gray-500"
                  />
                  <h2 className="text-xl font-semibold text-white">
                    {fullName}
                  </h2>
                </div>

                <p className="text-gray-300 mb-1">
                  <span className="font-medium text-white">Age:</span> {user.age || 'N/A'}
                  <br></br>
                  <span className="font-medium text-white">Gender:</span> {user.gender || 'N/A'}
                </p>

                <div className="mb-2">
                  <p className="font-medium text-white">Skills:</p>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {user.skills && user.skills.length > 0 ? (
                      user.skills.map((skill, i) => <li key={i}>{skill}</li>)
                    ) : (
                      <li>No skills listed</li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;
