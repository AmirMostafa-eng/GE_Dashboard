import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, User, Clock, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // start loading
    try {
      console.log("Login attempt:", formData);

      const returnedTokens = await axios.post("/api/Auth/login", formData);

      // Save session data
      sessionStorage.setItem("user", JSON.stringify(formData));
      sessionStorage.setItem("tokens", JSON.stringify(returnedTokens.data));

      toast.success("Login successful! Redirecting...");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      // Handle error messages gracefully
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setLoading(false); // stop loading whether success or fail
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Toast container */}
      <Toaster position="top-right" />

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-warning/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-warning/15 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center gap-12">
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
                      type="button"
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
                  disabled={loading}
                  className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-full shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
