import { useState } from "react";

export const Navbar = () => {
  // TODO: Obtener datos del usuario desde /api/profile
  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'
  // TODO: Después del logout exitoso, redireccionar a /login
  // TODO: Manejar errores apropiadamente

  //primero inicializo el estado de la autenticacion del usuario (empieza en false asumiendo que no se autenticó aún)
  const [authenticated, setIsAuthenticated] = useState(false);

  //estado para guardar el nombre del usuario desde el api/profile 
  const [username, setUserName] = useState("")

  //este useEffect se va a ejecutar cada vez que el usuario vaya a una nueva URL (location), esto es para que se verifique el estado de la autenticación en cada cambio de url 
  useEffect(() => {
    //función para verificar el perfil 
    const checkProfile = async () => {
      try {
        //se hace una petición GET a la API 
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include", //esto le dice al navegador que envie las cookies con la petición 
        });

        if (!res.ok) {
          setIsAuthenticated(false);
          return;
        }

        const data = await res.json();

        

         // Si la petición funcionó, ya está autenticado
        setIsAuthenticated(true);

      } catch (error) {
        console.error("Error verificando perfil:", error);
        setIsAuthenticated(false);
      }
    };
    //llamo a la función 
    checkProfile();
  }, []); //se ejecuta solo una vez, cuando carga el navbar 

  //LOGOUT
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        alert("No se pudo cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error cerrando sesión");
    }
  };

  const userName = setUserName(data.username); // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{userName}</span>
          </span>

          <button
            onClick={() => {
              handleLogout
               //TODO: Implementar handleLogout aquí
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
