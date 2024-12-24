"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Image from "next/image";
import logoSrc from "../../../public/logoSrc.png";
import { MailOpen, UserPen, LogInIcon, LucideXCircle } from "lucide-react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";

const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | null }>({
    text: "",
    type: null,
  });

  const router = useRouter();

  // Validate Email
  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return { text: "Email is required!", type: "error" as "error" };  // Type assertion ensures type is exactly "error"
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { text: "Please enter a valid email!", type: "error" as "error" };
    }

    return { text: "", type: null };
  };

  const handleEmailClear = () => {
    setEmail("");
  };

  // Validate First Name
  const validateFirstName = (firstName: string) => {
    if (!firstName.trim()) {
      return { text: "First name is required!", type: "error" as "error" }; // Type assertion ensures type is exactly "error"
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName)) {
      return { text: "First name cannot contain numbers!", type: "error" as "error" };
    }

    return { text: "", type: null };
  };

  const handleFirstClear = () => {
    setFirstName("");
  };

  // Validate Last Name
  const validateLastName = (lastName: string) => {
    if (!lastName.trim()) {
      return { text: "Last name is required!", type: "error" as "error" }; // Type assertion ensures type is exactly "error"
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(lastName)) {
      return { text: "Last name cannot contain numbers!", type: "error" as "error" };
    }

    return { text: "", type: null };
  };

  const handleLastClear = () => {
    setLastName("");
  };
  // Handle change (for real-time validation)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    if (field === "firstName") {
      setFirstName(value);
      // Check validation on change
      if (value.trim()) {
        setMessage((prevState) => ({ ...prevState, text: "", type: null }));
      }
    } else if (field === "lastName") {
      setLastName(value);
      if (value.trim()) {
        setMessage((prevState) => ({ ...prevState, text: "", type: null }));
      }
    } else if (field === "email") {
      setEmail(value);
      if (value.trim()) {
        setMessage((prevState) => ({ ...prevState, text: "", type: null }));
      }
    }
  };

  // Handle Register Button Click
  const handleRegister = () => {
    setIsButtonClicked(true);

    // Validate fields
    const firstNameValidation = validateFirstName(firstName);
    const lastNameValidation = validateLastName(lastName);
    const emailValidation = validateEmail(email);

    // Show error message if any field is invalid
    if (firstNameValidation.type === "error") {
      setMessage(firstNameValidation); // Set error message for first name
      return;
    }

    if (lastNameValidation.type === "error") {
      setMessage(lastNameValidation); // Set error message for last name
      return;
    }

    if (emailValidation.type === "error") {
      setMessage(emailValidation); // Set error message for email
      return;
    }

    // Simulate successful registration (this part should be replaced with actual API logic)
    console.log("Registering with firstName:", firstName);
    console.log("Registering with lastName:", lastName);
    console.log("Registering with email:", email);

    // Set success message and redirect
    setMessage({ text: "Registration successful! Welcome!", type: "success" });

    // Redirect to login page after successful registration
    setTimeout(() => {
      window.location.reload() // This redirects the user to the login page
    }, 5000); // Redirect after 2 seconds (you can adjust the timeout as needed)
  };

  // Check if all fields are filled
  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '';


  return (
    <div className="background-container">
      <Card className="w-[400px] p-4">
        <div className="flex justify-center items-center mt-4">
          <Image src={logoSrc} alt="Logo" width={100} height={100} />
        </div>
        <CardContent>
          <div className="flex flex-col justify-around space-y-3.5">

            <CardHeader className="card-header">
              <CardTitle className="card-title">Sign up</CardTitle>
              <CardTitle className="brand-title">to MVNx</CardTitle>
            </CardHeader>
            {/* Error/Success Message */}
            {message.text && (
              <p
               className={`text-left text-xs ${
               message.type === "error" ? "text-red-500" : "text-green-600"
               } flex items-center`}
                 >
               {message.type === "error" ? (
              <ExclamationCircleIcon className="text-red-500 h-4 w-4" />
                ) : (
              <CheckCircleIcon className="text-green-600 h-4 w-4" />
                )}
              <b className="pl-2">{message.text}</b>
              </p>
              )}
            {/* First Name */}
            <div className="input-container">
              <Input
                type="text"
                value={firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                placeholder="Enter your First Name"
                className={`border pl-12 ${
                  message.type === "error" && !firstName.trim() ? "border-red-500" : "border-gray-300"
                }`}
              />
              
              <UserPen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />

              {firstName &&
              <button onClick={handleFirstClear}>
              <LucideXCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4"/>
              </button>}

            </div>

            {/* Last Name */}
            <div className="input-container">
              <Input
                type="text"
                value={lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                placeholder="Enter your Last Name"
                className={`border pl-12 ${
                  message.type === "error" && !lastName.trim() ? "border-red-500" : "border-gray-300"
                }`}
              />
              <UserPen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />

              {lastName &&
              <button onClick={handleLastClear}>
              <LucideXCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4"/>
              </button>}

            </div>

            {/* Email */}
            <div className="input-container">
              <Input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e, "email")}
                placeholder="Enter your Email"
                className={`border pl-12 ${
                  message.type === "error" && !email.trim() ? "border-red-500" : "border-gray-300"
                }`}
              />
              <MailOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />

              {email &&
              <button onClick={handleEmailClear}>
              <LucideXCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4"/>
              </button>}

            </div>

            
            {/* Register Button */}
            <Button onClick={handleRegister} disabled={!isFormValid} className="Button">
              <LogInIcon /> SIGN UP 
            </Button>
          </div>
          <div className="separator-container">
              <div className="line"></div>
                <span className="or-text">OR</span>
            <div className="line"></div>
          </div>
           {/* Already have an account */}
           <button className="signup-button" onClick={() => router.push("/login")}>
              <h4>
                Already have an account?
              </h4>
            </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
