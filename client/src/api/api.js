const url = import.meta.env.VITE_SERVER_URL;

export const loginUser = async (data) => {
   const apiData = {
      name: data.given_name + " " + data.family_name,
      email: data.email,
      photo: data.picture,
      sub: data.sub,
   };

   try {
      const response = await fetch(`${url}/api/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(apiData),
      });

      const json = await response.json();

      return json.data;
   } catch (error) {
      console.log("Error in loginUser API", error.message);
   }
};

export const fetchUserData = async (token) => {
   try {
      const response = await fetch(`${url}/api/users/getUser`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ token }),
      });

      const json = await response.json();

      return json.user;
   } catch (error) {
      console.log("Error in fetchUserData API", error.message);
   }
};

export const createDocument = async (data) => {
   try {
      const response = await fetch(`${url}/api/documents/createDocument`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      const json = await response.json();

      console.log(json);

      return json.newDocument;
   } catch (error) {
      console.log("Error in createDocument API", error.message);
   }
};
