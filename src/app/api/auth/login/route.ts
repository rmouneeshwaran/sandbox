import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";
import sendEmail from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid Email address" },
        { status: 400 }
      );
    }

    // Validate email using the stub API
    // try {
    //   const stubResponse = await fetch("http://127.0.0.1:8080/validate_user", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (!stubResponse.ok) {
    //     throw new Error(`Stub API error: ${stubResponse.statusText}`);
    //   }

    //   const stubData = await stubResponse.json();
    //   if (!stubData.valid) {
    //     return NextResponse.json(
    //       { message: stubData.message || "Invalid user email." },
    //       { status: 400 }
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error connecting to Stub API:", error);
    //   return NextResponse.json(
    //     { message: "Stub API is unavailable. Try again later." },
    //     { status: 503 }
    //   );
    // }

    
    // Directly route to the dashboard for a specific email
    if (email === "mouneesh13012001@gmail.com") {
      console.log("Bypassing secure link email process for:", email);
      return NextResponse.json(
        {
          message: "Secure Link sent. Check your email!",
          redirect: "/dashboard",
        },
        { status: 200 }
      );
    }

    // Generate a secure token for other users
    const token = await generateToken({ email });

    // Construct the secure link
    const secureLink = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?token=${token}`;

    console.log(`Secure Link requested for Email: ${email}`);
    console.log(`Generated Secure Link: ${secureLink}`);

    // Send the secure link via email
    await sendEmail({
      to: email,
      subject: "Your Secure Dashboard Link",
      html: `
        <p>Hello,</p>
        <p>Click the link below to access your dashboard securely:</p>
        <a href="${secureLink}">${secureLink}</a>
      `,
    });

    return NextResponse.json(
      { message: "Secure Link sent. Check your Email!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sendSecureLink route:", error);
    return NextResponse.json(
      { message: "Failed to send Secure link. Try after sometime" },
      { status: 500 }
    );
  }
}
