import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {


  // TODO: Integrar lógica de autenticación aquí
  // TODO: Implementar useForm para el manejo del formulario
  // TODO: Implementar función handleSubmit

   // estado para saber si el login fue exitoso
  const [loggedIn, setLoggedIn] = useState(false);

  // useForm para manejar inputs del formulario
  const { formState, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  // función que maneja el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Credenciales inválidas");
        handleReset();
        return;
      }

      // si llega acá es pq se logró el login exitoso
      setLoggedIn(true);

    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
      handleReset();
    }
  };

  // si ya inició sesión muestro un mensaje y un Link al Home
  if (loggedIn) {
    return (
      <main className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow p-4 card-soft-pink text-center">
            <h3 className="fw-bold text-success mb-3">
              Inicio de sesión realizado
            </h3>

            <Link
              to="/home"
              className="btn btn-primary fw-bold w-100"
            >
              Ir al Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        {/* TODO: Mostrar este div cuando haya error */}
        <div className="hidden bg-red-100 text-red-700 p-3 rounded mb-4">
          <p className="text-sm">
            Credenciales incorrectas. Intenta nuevamente.
          </p>
        </div>

        <form onSubmit={(event) => {}}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ingresa tu usuario"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
