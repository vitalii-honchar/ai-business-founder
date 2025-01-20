import { login, signup } from "./actions";

const LoginPage = async ({ searchParams }) => {
  const params = await searchParams;
  const errorMessage = params.error;
  const infoMessage = params.info;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {errorMessage && (
          <div className="text-red-700 bg-red-100 border border-red-400 p-4 rounded mt-4 font-bold">
            {decodeURIComponent(errorMessage)}
          </div>
        )}
        {infoMessage && (
          <div className="text-blue-700 bg-blue-100 border border-blue-400 p-4 rounded mt-4 font-bold">
            {decodeURIComponent(infoMessage)}
          </div>
        )}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <button
              formAction={login}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Login
            </button>
          </div>
          <div>
            <button
              formAction={signup}
              className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;