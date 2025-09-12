import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, User, Clock, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Login attempt:", formData);

      const returnedTokens = await axios.post("/api/Auth/login", formData);
      sessionStorage.setItem("user", JSON.stringify(formData));
      sessionStorage.setItem("tokens", JSON.stringify(returnedTokens.data));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-warning/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-warning/15 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center gap-12">
        {/* Left side - Illustration */}
        {/* <div className="flex-1 hidden md:block">
          <img
            src="/A friendly cartoon-style character in flat vector illustration, standing on.jpg"
            alt="Illustration"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div> */}
        {/* Right side - Login Form */}
        <div className="flex-1 max-w-md">
          <Card className="shadow-2xl border-0 overflow-hidden bg-primary rounded-4xl">
            {/* Header */}
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <h1 className="sm:text-3xl text-xl  text-center text-white">
                Please log in to continue
              </h1>
            </CardHeader>

            {/* Form Content */}
            <CardContent
              className="p-8 bg-white rounded-4xl"
              style={{ borderRadius: "2rem 2rem 0 0" }}
            >
              <div className="space-y-6">
                {/* Username Input */}
                <div>
                  <Label
                    htmlFor="email"
                    className="text-muted-foreground ml-1 "
                  >
                    Enter Your Email
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Input
                      name="email"
                      id="email"
                      type="text"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 h-14 bg-muted/50 border-0 rounded-xl text-sm sm:text-md md:text-lg"
                    />
                    <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-muted-foreground ml-1"
                  >
                    Enter Your Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 h-14 bg-muted/50 border-0 rounded-xl text-lg"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-full shadow-lg"
                >
                  Login
                </Button>

                {/* Stay Logged In */}
                {/* <label
                  className={`flex items-center gap-3 cursor-pointer justify-center`}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={stayLoggedIn}
                      onChange={() => setStayLoggedIn(!stayLoggedIn)}
                      className="sr-only"
                    />
                    <div
                      className={`
                        flex items-center justify-center w-6 h-6
                        border-2 rounded-md transition-all duration-200 ease-in-out
                        ${
                          stayLoggedIn
                            ? "bg-primary border-primary shadow-md"
                            : "bg-white border-border hover:border-primary/50"
                        }
                        relative
                      `}
                    >
                      {stayLoggedIn && (
                        <Check className="w-4 h-4 text-primary-foreground absolute inset-0 m-auto transition-all duration-200" />
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-foreground select-none cursor-pointer`}
                  >
                    Remember Me
                  </span>
                </label> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
