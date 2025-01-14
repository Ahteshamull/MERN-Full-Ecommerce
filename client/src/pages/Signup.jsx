// import React, { useState } from "react";
// import logo from "../assets/headerImg.png";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router";
// import signinLogo from "../assets/signin.gif";
// import imageToBase64 from "../helper/Imagetobase64";
// import { ToastContainer, toast } from "react-toastify";
// import { handleError, handleSuccess } from "../Util";
//  import axios from "axios";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     profileImage: "",
//   });
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setData((prev) => ({ ...prev, [name]: value }));
// };

//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0];
//     const imagePic = await imageToBase64(file);

//     setData((prev) => {
//       return {
//         ...prev,
//         profileImage: imagePic,
//       };
//     });
//   };
//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const { name, email, password } = data;

//     if (!name || !email || !password) {
//       return handleError("(Name & Email & Password) Fields Are Required");
//     }
//     if (!name) {
//       return handleError("Name Field Are Required");
//     }
//     if (!email) {
//       return handleError("Email Field Are Required");
//     }
//     if (!password) {
//       return handleError("Password Field Are Required");
//     }

//     try {
//       const url = "https://localhost:3000/auth/signup";

//        const response = axios.post(url, {
//          name,
//          email,
//          password,
//          profileImage,
//        })
  
//     //  const response = await fetch("https://localhost:3000/auth/signup", {
//     //    method: "POST",
//     //    headers: {
//     //      "Content-Type": "application/json",
//     //    },
//     //    body: JSON.stringify({
//     //      name,
//     //      email,
//     //      password,
//     //      profileImage,
//     //    }),
//     //  });

      
//       const result = await response.json();
//       const { success, message, error } = result;
//       if (success) {
//         handleSuccess(message || "Signup successful");

//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0].message;
//         handleError(details);
//       } else if (!success) {
//         handleError(message);
//       }
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="font-[sans-serif] bg-white mt-2 flex items-center  p-4">
//         <div className="w-full max-w-5xl mx-auto">
//           <div className="grid md:grid-cols-2 md:gap-16 gap-8 bg-gray-50 shadow w-full sm:p-8 p-6 relative">
//             <div>
//               <Link to={"/"}>
//                 <div className="md:mb-16 mb-8">
//                   <img src={logo} alt="logo" className="w-40 inline-block" />
//                 </div>
//               </Link>
//               <div className="md:space-y-8 space-y-4">
//                 <div className="flex items-center gap-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
//                       data-original="#000000"
//                     />
//                   </svg>
//                   <h4 className="text-gray-800 text-base">
//                     Create Your Account
//                   </h4>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
//                       data-original="#000000"
//                     />
//                   </svg>
//                   <h4 className="text-gray-800 text-base">
//                     Simple &amp; Secure Registration
//                   </h4>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
//                       data-original="#000000"
//                     />
//                   </svg>
//                   <h4 className="text-gray-800 text-base">
//                     Terms and Conditions Agreement
//                   </h4>
//                 </div>
//               </div>
//             </div>
//             <form
//               onSubmit={handleSignup}
//               className="md:max-w-sm w-full mx-auto"
//             >
//               <div className="md:mb-8 mb-6">
//                 <h3 className="text-gray-800 text-2xl font-bold">Register</h3>
//               </div>
//               <div className="space-y-4">
//                 <div className="mx-auto w-[100px] h-[100px]  rounded-full overflow-hidden relative">
//                   <div>
//                     <img src={data.profileImage || signinLogo} alt="" />
//                   </div>
                
                    
//                   <label>
//                     <div className="text-xs bg-slate-200 absolute cursor-pointer  py-4  bottom-0 w-full text-center bg-opacity-85">
//                       Upload Photo
//                     </div>
//                     <input
//                       onChange={handleUploadImage}
//                       className="hidden"
//                       type="file"
//                     />
//                   </label>

                   
//                 </div>
//                 <div>
//                   <label className="text-gray-800 text-sm mb-2 block">
//                     Name
//                   </label>
//                   <div className="relative flex items-center">
//                     <input
//                       name="name"
//                       type="text"
//                       onChange={handleChange}
//                       value={data.name}
//                       required
//                       className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
//                       placeholder="Enter name"
//                     />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="#bbb"
//                       stroke="#bbb"
//                       className="w-4 h-4 absolute right-4"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle cx={10} cy={7} r={6} data-original="#000000" />
//                       <path
//                         d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
//                         data-original="#000000"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-gray-800 text-sm mb-2 block">
//                     Email Id
//                   </label>
//                   <div className="relative flex items-center">
//                     <input
//                       name="email"
//                       type="email"
//                       onChange={handleChange}
//                       value={data.email}
//                       required
//                       className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
//                       placeholder="Enter email"
//                     />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="#bbb"
//                       stroke="#bbb"
//                       className="w-4 h-4 absolute right-4"
//                       viewBox="0 0 682.667 682.667"
//                     >
//                       <defs>
//                         <clipPath id="a" clipPathUnits="userSpaceOnUse">
//                           <path d="M0 512h512V0H0Z" data-original="#000000" />
//                         </clipPath>
//                       </defs>
//                       <g
//                         clipPath="url(#a)"
//                         transform="matrix(1.33 0 0 -1.33 0 682.667)"
//                       >
//                         <path
//                           fill="none"
//                           strokeMiterlimit={10}
//                           strokeWidth={40}
//                           d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
//                           data-original="#000000"
//                         />
//                         <path
//                           d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
//                           data-original="#000000"
//                         />
//                       </g>
//                     </svg>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-gray-800 text-sm mb-2 block">
//                     Password
//                   </label>
//                   <div className="relative flex items-center">
//                     <input
//                       name="password"
//                       onChange={handleChange}
//                       value={data.password}
//                       type={showPassword ? "text" : "password"}
//                       required
//                       className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
//                       placeholder="Enter password"
//                     />

//                     <div
//                       className="absolute top-2 right-3 cursor-pointer"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                     >
//                       <span>
//                         {showPassword ? (
//                           <FaEyeSlash size={20} className="text-gray-400" />
//                         ) : (
//                           <FaEye size={20} className="text-gray-400" />
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <button
                 
//                   type="submit"
//                   className="w-full py-2.5 px-4 text-sm tracking-wide rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
//                 >
//                   Create Account
//                 </button>
//               </div>
//               <p className="text-sm text-gray-800 mt-6 text-center">
//                 Already have an account?{" "}
//                 <Link
//                   className="text-blue-600 font-semibold hover:underline ml-1"
//                   to={"/login"}
//                 >
//                   Login here
//                 </Link>
//               </p>
//             </form>
//             <div className="divider absolute left-0 right-0 mx-auto w-1 h-full border-l border-gray-400 max-md:hidden" />
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import logo from "../assets/headerImg.png";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import signinLogo from "../assets/signin.gif";
// import imageToBase64 from "../helper/Imagetobase64";
// import { ToastContainer, toast } from "react-toastify";
// import { handleError, handleSuccess } from "../Util";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     profileImage: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUploadImage = async (e) => {
//     try {
//       const file = e.target.files[0];
//       const imagePic = await imageToBase64(file);
//       setData((prev) => ({ ...prev, profileImage: imagePic }));
//     } catch (error) {
//       handleError("Error uploading image: " + error.message);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const { name, email, password } = data;

//     if (!name || !email || !password) {
//       return handleError("(Name & Email & Password) Fields Are Required");
//     }

//     try {
//       const response = await fetch("http://localhost:3000/auth/signup", {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           profileImage: data.profileImage, // Assuming profileImage is already base64 encoded
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         handleSuccess(result.message || "Signup successful");
//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       } else {
//         handleError(result.error || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       handleError("Network error: " + error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="font-[sans-serif] bg-white mt-2 flex items-center  p-4">
//          <div className="w-full max-w-5xl mx-auto">
//           <div className="grid md:grid-cols-2 md:gap-16 gap-8 bg-gray-50 shadow w-full sm:p-8 p-6 relative">
//              <div>
//              <Link to={"/"}>
//                  <div className="md:mb-16 mb-8">
//                    <img src={logo} alt="logo" className="w-40 inline-block" />
//                  </div>
//               </Link>
//                <div className="md:space-y-8 space-y-4">
//                 <div className="flex items-center gap-3">
//                  <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
//                       data-original="#000000"
//                     />
//                   </svg>
//                   <h4 className="text-gray-800 text-base">
//                     Create Your Account
//                   </h4>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
//                       data-original="#000000"
//                     />
//                   </svg>
//                   <h4 className="text-gray-800 text-base">
//                     Simple &amp; Secure Registration
//                   </h4>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
//                       data-original="#000000"
//                     />
//                   </svg>
//                   <h4 className="text-gray-800 text-base">
//                     Terms and Conditions Agreement
//                   </h4>
//                 </div>
//               </div>
//             </div>
//             <form
//               onSubmit={handleSignup}
//               className="md:max-w-sm w-full mx-auto"
//             >
//               <div className="md:mb-8 mb-6">
//                 <h3 className="text-gray-800 text-2xl font-bold">Register</h3>
//               </div>
//               <div className="space-y-4">
//                 <div className="mx-auto w-[100px] h-[100px]  rounded-full overflow-hidden relative">
//                   <div>
//                     <img src={data.profileImage || signinLogo} alt="" />
//                   </div>
                
                    
//                   <label>
//                     <div className="text-xs bg-slate-200 absolute cursor-pointer  py-4  bottom-0 w-full text-center bg-opacity-85">
//                       Upload Photo
//                     </div>
//                     <input
//                       onChange={handleUploadImage}
//                       className="hidden"
//                       type="file"
//                     />
//                   </label>

                   
//                 </div>
//                 <div>
//                   <label className="text-gray-800 text-sm mb-2 block">
//                     Name
//                   </label>
//                   <div className="relative flex items-center">
//                     <input
//                       name="name"
//                       type="text"
//                       onChange={handleChange}
//                       value={data.name}
//                       required
//                       className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
//                       placeholder="Enter name"
//                     />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="#bbb"
//                       stroke="#bbb"
//                       className="w-4 h-4 absolute right-4"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle cx={10} cy={7} r={6} data-original="#000000" />
//                       <path
//                         d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
//                         data-original="#000000"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-gray-800 text-sm mb-2 block">
//                     Email Id
//                   </label>
//                   <div className="relative flex items-center">
//                     <input
//                       name="email"
//                       type="email"
//                       onChange={handleChange}
//                       value={data.email}
//                       required
//                       className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
//                       placeholder="Enter email"
//                     />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="#bbb"
//                       stroke="#bbb"
//                       className="w-4 h-4 absolute right-4"
//                       viewBox="0 0 682.667 682.667"
//                     >
//                       <defs>
//                         <clipPath id="a" clipPathUnits="userSpaceOnUse">
//                           <path d="M0 512h512V0H0Z" data-original="#000000" />
//                         </clipPath>
//                       </defs>
//                       <g
//                         clipPath="url(#a)"
//                         transform="matrix(1.33 0 0 -1.33 0 682.667)"
//                       >
//                         <path
//                           fill="none"
//                           strokeMiterlimit={10}
//                           strokeWidth={40}
//                           d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
//                           data-original="#000000"
//                         />
//                         <path
//                           d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
//                           data-original="#000000"
//                         />
//                       </g>
//                     </svg>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-gray-800 text-sm mb-2 block">
//                     Password
//                   </label>
//                   <div className="relative flex items-center">
//                     <input
//                       name="password"
//                       onChange={handleChange}
//                       value={data.password}
//                       type={showPassword ? "text" : "password"}
//                       required
//                       className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
//                       placeholder="Enter password"
//                     />

//                     <div
//                       className="absolute top-2 right-3 cursor-pointer"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                     >
//                       <span>
//                         {showPassword ? (
//                           <FaEyeSlash size={20} className="text-gray-400" />
//                         ) : (
//                           <FaEye size={20} className="text-gray-400" />
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <button
                 
//                   type="submit"
//                   className="w-full py-2.5 px-4 text-sm tracking-wide rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
//                 >
//                   Create Account
//                 </button>
//               </div>
//               <p className="text-sm text-gray-800 mt-6 text-center">
//                 Already have an account?{" "}
//                 <Link
//                   className="text-blue-600 font-semibold hover:underline ml-1"
//                   to={"/login"}
//                 >
//                   Login here
//                 </Link>
//               </p>
//             </form>
//             <div className="divider absolute left-0 right-0 mx-auto w-1 h-full border-l border-gray-400 max-md:hidden" />
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import logo from "../assets/headerImg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import signinLogo from "../assets/signin.gif";
import imageToBase64 from "../helper/Imagetobase64";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for React Toastify
import axios from "axios";
import { handleError, handleSuccess } from "../Util";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        return handleError("Please select an image.");
      }

      const imagePic = await imageToBase64(file);
      setData((prev) => ({ ...prev, profileImage: imagePic }));
    } catch (error) {
      handleError("Error uploading image: " + error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = data;

    if (!name || !email || !password) {
      return handleError("(Name & Email & Password) Fields Are Required");
    }

    try {
      const response = await axios.post("https://localhost:3000/auth/signup", {
        name,
        email,
        password,
        profileImage: data.profileImage,
      });

      if (response.status === 201) {
        // Assuming 201 Created status code
        handleSuccess(response.data.message || "Signup successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(response.data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      handleError("Network error: " + error.message);
    }
  };

  // ... (rest of the JSX) ...

  return (
    <div className="container mx-auto">
      <div className="font-[sans-serif] bg-white mt-2 flex items-center  p-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 md:gap-16 gap-8 bg-gray-50 shadow w-full sm:p-8 p-6 relative">
            <div>
              <Link to={"/"}>
                <div className="md:mb-16 mb-8">
                  <img src={logo} alt="logo" className="w-40 inline-block" />
                </div>
              </Link>
              <div className="md:space-y-8 space-y-4">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  <h4 className="text-gray-800 text-base">
                    Create Your Account
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  <h4 className="text-gray-800 text-base">
                    Simple &amp; Secure Registration
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  <h4 className="text-gray-800 text-base">
                    Terms and Conditions Agreement
                  </h4>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSignup}
              className="md:max-w-sm w-full mx-auto"
            >
              <div className="md:mb-8 mb-6">
                <h3 className="text-gray-800 text-2xl font-bold">Register</h3>
              </div>
              <div className="space-y-4">
                <div className="mx-auto w-[100px] h-[100px]  rounded-full overflow-hidden relative">
                  <div>
                    <img src={data.profileImage || signinLogo} alt="" />
                  </div>
                
                    
                  <label>
                    <div className="text-xs bg-slate-200 absolute cursor-pointer  py-4  bottom-0 w-full text-center bg-opacity-85">
                      Upload Photo
                    </div>
                    <input
                      onChange={handleUploadImage}
                      className="hidden"
                      type="file"
                    />
                  </label>

                   
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      type="text"
                      onChange={handleChange}
                      value={data.name}
                      required
                      className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
                      placeholder="Enter name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={10} cy={7} r={6} data-original="#000000" />
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email Id
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={data.email}
                      required
                      className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
                      placeholder="Enter email"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000" />
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit={10}
                          strokeWidth={40}
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        />
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      onChange={handleChange}
                      value={data.password}
                      type={showPassword ? "text" : "password"}
                      required
                      className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded focus:border-black outline-none"
                      placeholder="Enter password"
                    />

                    <div
                      className="absolute top-2 right-3 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span>
                        {showPassword ? (
                          <FaEyeSlash size={20} className="text-gray-400" />
                        ) : (
                          <FaEye size={20} className="text-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                 
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm tracking-wide rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
                >
                  Create Account
                </button>
              </div>
              <p className="text-sm text-gray-800 mt-6 text-center">
                Already have an account?{" "}
                <Link
                  className="text-blue-600 font-semibold hover:underline ml-1"
                  to={"/login"}
                >
                  Login here
                </Link>
              </p>
            </form>
            <div className="divider absolute left-0 right-0 mx-auto w-1 h-full border-l border-gray-400 max-md:hidden" />
          </div>
        </div>
      </div>
          <ToastContainer />
    </div>
  );
};

export default Signup;

