import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/ui/Error";
import { useLoginMutation } from "../../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isSuccess, isError, error }] = useLoginMutation();

  const navigate = useNavigate();

  const loadDemoHandle = () => {
    setEmail("tanmoyjoy7777@gmail.com");
    setPassword("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/course");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          {/* <img className="h-12 mx-auto" src={learningPortal} alt="logo" /> */}
          <h2
            style={{ textAlign: "center" }}
            className="h-12 mx-auto logoTitle"
          >
            JS শিখি
          </h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isError && <Error message={error.data} />}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label for="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
            <button
              onClick={loadDemoHandle}
              style={{ marginTop: "15px" }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Login as Demo User
            </button>
            <div
              style={{ marginTop: "15px" }}
              className="flex items-center justify-end"
            >
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Create New Account
                </Link>
              </div>
            </div>
            <div
              style={{ marginTop: "10px" }}
              className="flex items-center justify-end"
            >
              <div className="text-sm">
                <Link to="/admin" className="font-medium hover:text-violet-500">
                  Login as Admin?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
