"use client"

import {useUser} from "@/contexts/userContext";
import PageHeader from "@/components/pageHeader";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import User from "@/interfaces/user";
import {fetchUsers} from "@/services/userService";
import {fetchAllUserGroups} from "@/services/userGroupService";
import UserGroup from "@/interfaces/userGroup";
import UserDashboardRow from "@/components/userDashboardRow";
import {Button} from "@/components/ui/button";

export default function UserDashboard() {
    const {user} = useUser();
    const [users, setUsers] = useState<User[]>([]);
    const [usersForNextPage, setUsersForNextPage] = useState<User[]>([]);
    const [userGroups, setUsersGroups] = useState<UserGroup[]>([]);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const searchRef = useRef<HTMLInputElement>(null);
    const limit: number = 10;
    const [groupFilter, setGroupFilter] = useState<number>(0);
    const groupFilterRef = useRef<HTMLSelectElement>(null);

    //Fetch users for the current page
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;
        
        const getUsers = async () => {
            const fetchedUsers: User[] | [] = await fetchUsers({limit, offset: (page - 1) * limit, search, groupId : groupFilter}, signal);
            setUsers(fetchedUsers);
        }
        getUsers();

        return () => controller.abort();
    }, [search, groupFilter]);


    //Fetch users for the next page 
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;

        const getUsersForNextPage = async () => {
            const fetchedUsers: User[] | [] = await fetchUsers({limit, offset: page * limit, search, groupId : groupFilter}, signal);
            setUsersForNextPage(fetchedUsers);
        }
        getUsersForNextPage();
        
        return () => controller.abort();
    }, [page, search, groupFilter]);

    //Get all user groups on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;
        const getAllUserGroups = async () => {
            const fetchedUserGroups: UserGroup[] = await fetchAllUserGroups(signal);
            setUsersGroups(fetchedUserGroups)
        }
        getAllUserGroups();
        
        return () => controller.abort();
    }, []);
    
    const handlePagination = () => {
        setUsers(users => [...users, ...usersForNextPage]);
        setPage(page => page + 1);
    }

    const handlePageReset = () => {
        //If there is text in the search bar clear it
        if (searchRef.current) {
            searchRef.current.value = "";
            setSearch("");
        }
        
        //Clear group filter
        if (groupFilterRef.current) {
            groupFilterRef.current.value = "0";
            setGroupFilter(0);
        }
        
        //Slice the users array down to 1 page worth of results
        setUsers(prevUsers => prevUsers.slice(0, limit))

        setPage(1);
    }

    const handleSearch = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
            setPage(1);
        }
    }
    const groupFilterHandler = ( e : ChangeEvent<HTMLSelectElement>) => {
        setPage(1);
        setGroupFilter(Number(e.target.value));
    }
    
    //Update the users state when a user is deleted
    const handleUserDelete = (user: User) => {
        setUsers(prevUsers => prevUsers.filter(u => u.userId !== user.userId));
    }
    
    //If user is not an admin return a 404 error page
    if (user?.userGroup.groupName !== "Admin") {
        return (
            <main>
                <h1 className="text-center py-12">404 - Page Not Found</h1>
            </main>
        )
    }
    
    return (
        <main>
            <div>
                <PageHeader
                    title="User Dashboard"
                    description="Manage users within the system"
                />
            </div>
            <div className="container m-auto my-12 px-5">
                <div className="py-4">
                    <div className="w-1/2 m-auto">
                        <div className="flex border rounded w-full mb-12 px-1">
                            <span className="m-auto material-symbols-outlined">search</span>
                            <input
                                onKeyDown={handleSearch}
                                defaultValue={search}
                                className="w-full p-1"
                                type="text"
                                placeholder="Search by name or e-mail"
                                ref={searchRef}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="ms-auto">
                            <label className="font-semibold text-pink-700">Group:</label>
                            <select onChange={groupFilterHandler} className="border mx-1 px-1 rounded" ref={groupFilterRef}>
                                <option value="0">All</option>
                                {userGroups.map((group: UserGroup) => (
                                    <option
                                        value={group.groupId}>{group.groupName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <table className="table-fixed w-full">
                            <thead>
                            <tr className="text-left">
                                <th className="border-b border-gray-300 text-pink-700">Name</th>
                                <th className="border-b border-gray-300 text-pink-700">E-mail</th>
                                <th className="border-b border-gray-300 text-pink-700">Role</th>
                                <th className="border-b border-gray-300 text-pink-700">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length > 0 ? (
                                users.map((user: User) => (
                                    <UserDashboardRow
                                        key={user.userId}
                                        user={user}
                                        userGroups={userGroups}
                                        handleUserDelete={handleUserDelete}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-3 text-xl"> No users found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                    {usersForNextPage.length > 0 ? (
                        <div className="flex">
                            <Button className="m-auto bg-pink-700 hover:bg-pink-800" onClick={handlePagination}>
                                Load more
                            </Button>
                        </div>
                    ): (
                        <div className="flex">
                            <Button className="m-auto bg-gray-700 hover:bg-gray-800" onClick={handlePageReset}>
                                Go back
                            </Button>
                        </div>
                    )}
                </div>
        </main>
    )
}