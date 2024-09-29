import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { adminLogout } from '../../slices/adminSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Dashboard() {
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        userId: '',
        name: '',
        email: '',
        phone: '',
        profilePicture: null,
    });

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        password:'',
        confirmPassword:'',
        profilePicture: null,
    });
    const [errors, setErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});
    const { admin } = useSelector((state) => state.admin);
    const dispatch = useDispatch()
    const navigate =useNavigate()
    useEffect(()=>{
        if(!admin){
            
            navigate('/admin')
        }
    },[admin])
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/admin/dashboard");
                setUserData(response.data.users);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = (userId) => {
        const userToEdit = userData.find(user => user._id === userId);
        setEditFormData({
            userId: userToEdit?._id,
            name: userToEdit?.name,
            email: userToEdit?.email,
            phone: userToEdit?.phone,
            profilePicture: userToEdit?.profile_picture?.url,
        });

        // Open the modal
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setNewUser({
            userId: '',
            name: '',
            email: '',
            phone: '',
            profilePicture: null,
        });

        // Open the modal
        setCreateModalOpen(true);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleNewUserInputChange = (e)=>{
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    }
    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditFormData({
                    ...editFormData,
                    profilePicture: reader.result, // base64 string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNewUserImage = (e)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewUser({
                    ...newUser,
                    profilePicture: reader.result, // base64 string
                });
            };
            reader.readAsDataURL(file);
        }
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let isValid = true;
    const errors = {};

    // Name validation (example)
    // if (!editFormData.name || !editFormData.name.trim()) {
    //     errors.name = 'Name is required';
    //     isValid = false;
    // }
    if (!editFormData.name || !editFormData.name.trim()) {
        errors.name = 'Name is required';
        isValid = false;
      } else if (editFormData.name.trim() !== editFormData.name) {
        errors.name = 'Name cannot start or end with whitespace';
        isValid = false;
      } else if (!/^[a-zA-Z ]+$/.test(editFormData.name.trim())) {
        errors.name = 'Name should only contain letters and spaces';
        isValid = false;
      }

    // Email validation (example)
    // if (!editFormData.email || !editFormData.email.trim()) {
    //     errors.email = 'Email is required';
    //     isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(editFormData.email.trim())) {
    //     errors.email = 'Email is invalid';
    //     isValid = false;
    // }

    if (!editFormData.email || !editFormData.email.trim()) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(editFormData.email.trim())) {
        errors.email = 'Email is invalid';
        isValid = false;
      } else if (editFormData.email !== editFormData.email.trim()) {
        errors.email = 'Email cannot start or end with whitespace';
        isValid = false;
      }

    // Phone number validation (example)
    // if (!editFormData.phone || !String(editFormData.phone).trim()) {
    //     errors.phone = 'Phone number is required';
    //     isValid = false;
    // } else if (!/^\d{10}$/.test(String(editFormData.phone).trim())) {
    //     errors.phone = 'Phone number should be 10 digits';
    //     isValid = false;
    // }

    // Phone number validation
    if (!editFormData.phone || !editFormData.phone) {
        errors.phone = 'Phone number is required';
        isValid = false;
      } else if (editFormData.phone !== editFormData.phone) {
        errors.phone = 'Phone number cannot start or end with whitespace';
        isValid = false;
      } else if (!/^\d{10}$/.test(editFormData.phone)) {
        errors.phone = 'Phone number should be 10 digits';
        isValid = false;
      }

    // Set errors if any
    if (!isValid) {
        setEditErrors(errors);
        return; // Exit early if form is invalid

    }
    
        try {
        const isEdit = editFormData.userId !== '';

        const userToEdit = userData.find(user => user._id === editFormData.userId);
        if (!userToEdit && editFormData.userId) {
            console.error("User not found");
            return;
        }

        const updateData = {
            id: editFormData.userId,
            name: editFormData.name !== userToEdit?.name ? editFormData.name : undefined,
            email: editFormData.email !== userToEdit?.email ? editFormData.email : undefined,
            phone: editFormData.phone !== userToEdit?.phone ? editFormData.phone : undefined,
            profilePicture: editFormData.profilePicture && editFormData.profilePicture !== userToEdit?.profile_picture?.url
                ? editFormData.profilePicture
                : undefined,
        };

     
            const response = await axios.put("/api/admin/edit", updateData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });   

            console.log("Edit successful:", response.data.userData);
           
            // Close the modal after successful edit
            setIsModalOpen(false);
           
            const updatedUsers = userData.map(user => {
                if (user._id === response.data.userData._id) {
                    return {
                        ...user,
                        name: response.data.userData.name || user.name,
                        email: response.data.userData.email || user.email,
                        phone: response.data.userData.phone || user.phone,
                        profile_picture: {
                            url: response.data.userData.profile_picture?.url || user.profile_picture?.url
                        }
                    };
                }
                return user;
            });
            setUserData(updatedUsers);

        } catch (error) {
            console.error("Error editing user:", error);
        }
    };



    

    const handleCreateUserSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        let isValid = true;
        const errors = {};

        // Name validation
        // if (!newUser.name || !newUser.name.trim()) {
        //     errors.name = 'Name is required';
        //     isValid = false;
        // } else if (!/^[a-zA-Z ]+$/.test(newUser.name.trim())) {
        //     errors.name = 'Name should only contain letters and spaces';
        //     isValid = false;
        // }
        if (!newUser.name || !newUser.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
          } else if (newUser.name.trim() !== newUser.name) {
            errors.name = 'Name cannot start with whitespace';
            isValid = false;
          } else if (!/^[a-zA-Z ]+$/.test(newUser.name.trim())) {
            errors.name = 'Name should only contain letters and spaces';
            isValid = false;
          }

        // Email validation
        // if (!newUser.email || !newUser.email.trim()) {
        //     errors.email = 'Email is required';
        //     isValid = false;
        // } else if (!/\S+@\S+\.\S+/.test(newUser.email.trim())) {
        //     errors.email = 'Email is invalid';
        //     isValid = false;
        // }
        if (!newUser.email || !newUser.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
          } else if (!/^\S+@\S+\.\S+$/.test(newUser.email.trim())) {
            errors.email = 'Email is invalid';
            isValid = false;
          } else if (newUser.email !== newUser.email.trim()) {
            errors.email = 'Email cannot start or end with whitespace';
            isValid = false;
          }
          

        // Phone number validation
        if (!newUser.phone || !newUser.phone) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(newUser.phone)) {
            errors.phone = 'Phone number should be 10 digits';
            isValid = false;
        }

        // if (!newUser.phone || !newUser.phone.trim()) {
        //     errors.phone = 'Phone number is required';
        //     isValid = false;
        //   } else if (newUser.phone.trim() !== newUser.phone) {
        //     errors.phone = 'Phone number cannot start or end with whitespace';
        //     isValid = false;
        //   } else if (!/^\d{10}$/.test(newUser.phone.trim())) {
        //     errors.phone = 'Phone number should be 10 digits';
        //     isValid = false;
        //   }

        // Password validation
        if (!newUser.password || !newUser.password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        }

        // Confirm password validation
        if (!newUser.confirmPassword || !newUser.confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm Password is required';
            isValid = false;
        } else if (newUser.password.trim() !== newUser.confirmPassword.trim()) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        // Set errors if any
        if (!isValid) {
            setErrors(errors);
            return; // Exit early if form is invalid
        }

        // If all validations pass, proceed to submit
        try {
            const data = {
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                password: newUser.password,
                profilePicture: newUser.profilePicture,
            };

            await axios.post("/api/admin/create", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Clear form and close modal on success
            setCreateModalOpen(false);
            window.location.reload(); // Consider better UI update methods

        } catch (error) {
            console.error(error);
        }
    };


    

    const handleDelete = async (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const data = { userId };
                    const response = await axios.post("/api/admin/delete-user", data);
                    setUserData(response.data.users);

                    toast.success('User has been deleted.');
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the user.',
                        'error'
                    );
                }
            }
        });
    };


    const handleLogout = ()=>{
        try{
            dispatch(adminLogout())
            const response = axios.post("/api/admin/logout")
            console.log(response.data);
            navigate("/admin")
        }catch(error){
            console.error(error);
        }
    }

    const [searchQuery,setSearchQuery] = useState("")
    const handleSearch = async () => {
        try {
            const response = await axios.post('/api/admin/dashboard', { search: searchQuery });
            setUserData(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold my-6">Dashboard</h1>
            <div className="w-3/4 p-6 mt-4">
    <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
            <input 
                type="text" 
                placeholder="Search..." 
                className="border rounded px-2 py-1" 
                value={searchQuery} 
                onChange={(e) => {setSearchQuery(e.target.value) ,handleSearch()}} 
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
        </div>
        <div className="flex space-x-2">
            <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">Create</button>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-5 gap-4 pb-4 border-b">
            <div className="font-bold text-center">Profile Image</div>
            <div className="font-bold text-center">Name</div>
            <div className="font-bold text-center">Email</div>
            <div className="font-bold text-center">Phone Number</div>
            <div className="font-bold text-center">Action</div>
        </div>
        {/* Dynamic rows */}
        {userData.map((user) => (
            <div key={user._id} className="grid grid-cols-5 gap-4 py-4 border-b">
                <div className="text-center">
                    {user?.profile_picture?.url ? (
                        <img
                            src={user.profile_picture.url}
                            alt="Profile"
                            className="rounded-full mx-auto h-20 w-20"
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/50" // Default profile image
                            alt="Profile"
                            className="rounded-full mx-auto h-20 w-20"
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </div>
                <div className="text-center">{user.name}</div>
                <div className="text-center">{user.email}</div>
                <div className="text-center">{user.phone}</div>
                <div className="text-center space-x-2">
                    <button onClick={() => handleEdit(user._id)} className="bg-blue-500 text-white px-4 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
                </div>
            </div>
        ))}
    </div>
    <ToastContainer />
</div>


            {/* Modal */}
            {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg relative flex flex-col p-8">
                <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
                <form onSubmit={handleSubmit}>
                    {/* Profile Picture Preview */}
                    <div className="mb-4 flex justify-center items-center">
                        <div className="h-32 w-32 overflow-hidden rounded-full">
                            {editFormData.profilePicture ? (
                                <img
                                    src={editFormData.profilePicture}
                                    alt="Profile Preview"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <img
                                    src="https://via.placeholder.com/150" // Placeholder image URL
                                    alt="Profile Placeholder"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            )}
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={editFormData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {editErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{editErrors.name}</p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {editErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{editErrors.email}</p>
                        )}
                    </div>

                    {/* Phone Input */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {editErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{editErrors.phone}</p>
                        )}
                    </div>

                    {/* Profile Picture Input */}
                    <div className="mb-4">
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Save Changes</button>
                        <button type="button" onClick={() => {setIsModalOpen(false) , setEditErrors({})}} className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-1 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}

            {/* End Modal */}




            {/* Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-lg mx-auto my-6">
                        <div className="bg-white rounded-lg shadow-lg relative flex flex-col p-8">
                            <h3 className="text-2xl font-semibold mb-4">Create User</h3>
                            <form onSubmit={handleCreateUserSubmit}>
                                {/* Profile Picture Preview */}
                                <div className="mb-4 flex justify-center items-center">
                                    <div className="h-32 w-32 overflow-hidden rounded-full">
                                        {newUser.profilePicture ? (
                                            <img
                                                src={newUser.profilePicture}
                                                alt="Profile Preview"
                                                className="h-full w-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <img
                                                src="https://via.placeholder.com/150" // Placeholder image URL
                                                alt="Profile Placeholder"
                                                className="h-full w-full object-cover rounded-full"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Name Input */}
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleNewUserInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleNewUserInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone Input */}
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={newUser.phone}
                                        onChange={handleNewUserInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleNewUserInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password Input */}
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={newUser.confirmPassword}
                                        onChange={handleNewUserInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Profile Picture Input */}
                                <div className="mb-4">
                                    <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        name="profilePicture"
                                        onChange={handleNewUserImage}
                                        accept="image/*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Save Changes</button>
                                    <button type="button" onClick={() =>{ setCreateModalOpen(false),setErrors({})}} className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-1 rounded">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* End Modal */}
        </div>
    );
}

export default Dashboard;
