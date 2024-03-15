import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import APIServices from "./APIServices";

function UserHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [groups, setGroups] = useState(null);
    const username = location.state?.username || '';

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await APIServices.userGroups(username);
                setGroups(data); // Update state with fetched data
            } catch (error) {
                console.error("Failed to fetch groups", error);
    
            }
        };

        fetchGroups();
    }, [username]); 
    useEffect(() => {
        if (groups) {
            const jsonString = JSON.stringify(groups);
            console.log(jsonString);
        }
    }, [groups]);

    if (!groups) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>User-Home</p>
            {groups.groups && Array.isArray(groups.groups) && (
                <ul>
                    {groups.groups.map((group, index) => (
                        <li key={index}>
                            Group ID: {group.groupid}, Expenses: {group.expenses}, Members involved: {group.member_1},{group.member_2},{group.member_3}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserHome;
