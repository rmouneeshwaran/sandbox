"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import Modal from "@/components/ui/Modal";
import logo from "../../../public/logoSrc.png"
import Image from "next/image";
import { LucideXCircle, MailIcon } from "lucide-react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import CircleLoader from "@/components/ui/circleLoader";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | null }>({
    text: "",
    type: null,
  });
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const router = useRouter();
  // Real-time email validation logic
  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return { text: "Email is required!", type: "error" as "error" };  // Ensure 'error' is typed as 'error'
    }
   
    return { text: "", type: null };  // 'null' is valid
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ text: "", type: null }); // Clear any previous messages

  const minimumLoaderTime = 3000; // 3 seconds delay
  const startTime = Date.now();

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // Calculate remaining time to reach the minimum delay
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minimumLoaderTime - elapsedTime;

    setTimeout(() => {
      if (response.ok) {
        setMessage({ text: data.message || "Check your Email for the magic link!", type: "success" });

        // Navigate after a short delay
        setTimeout(() => {
          router.push("/dashboard"); // Adjust the path as needed
        }, 1500); // Wait for the user to read the success message
      } else {
        setMessage({ text: data.message || "Something went wrong!", type: "error" });
      }
      setLoading(false);
    }, Math.max(remainingTime, 0)); // Ensure non-negative delay
  } catch (error) {
    setTimeout(() => {
      setMessage({ text: "Error sending magic link.", type: "error" });
      setLoading(false);
    }, Math.max(3000 - (Date.now() - startTime), 0));
  }
};



  // Email input change handler (for real-time validation)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // If the user starts typing, clear the error message immediately if it was there
    if (isButtonClicked) {
      const validation = validateEmail(newEmail);
      setMessage(validation);
    } else {
      setMessage({ text: "", type: null }); // Clear message if button hasn't been clicked yet
    }
  };

  const handleClearInput = () => {
    setEmail("");
    setMessage({ text: "", type: null });
  };



  return (
    <div className="background-container"  >
      <Card className="w-[400px] p-4">
        {/* Logo */}
        <div className="card-logo">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>

        <CardHeader className="card-header">
          <CardTitle className="card-title">
            Sign in to MVNx Sandbox
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="card-content-container">
            {message.text && (
              <p
                className={`${message.type === "error" ? "text-red-500" : "text-green-600"
                  } flex items-center`}
              >
                {message.type === "error" ? (
                  <ExclamationCircleIcon className="text-red-500 h-4 w-4" />
                ) : (
                  <CheckCircleIcon className="text-green-600 h-4 w-4" />
                )}
                <b className="message-text">{message.text}</b>
              </p>
            )}
            <div className="input-container">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your Email"
                className={`border pl-12 ${message.type === "error" ? "border-red-500" : ""}`}
              />
              <MailIcon className="icon" />
              {email &&
                <button onClick={handleClearInput}>
                  <LucideXCircle className="input-clear" />
                </button>}
            </div>
            <Button className="Button" onClick={handleSubmit}>
              {loading ? (
                <CircleLoader size={16} color="text-white" />
              ) : (
                "GET LINK"
              )}
            </Button>
          </div>
          {/* <div className="separator-container">
                    <div className="line"></div>
                    <span className="or-text">OR</span>
                    <div className="line"></div>
                  </div>
                <button className="signup-button" onClick={signup}>
                  <h4>Don't have an account? Create one now</h4>
                </button> */}
        </CardContent>
      </Card>
    </div>
  );
}
