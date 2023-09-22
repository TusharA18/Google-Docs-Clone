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

      return json.newDocument;
   } catch (error) {
      console.log("Error in createDocument API", error.message);
   }
};

export const getAllDocuments = async (data) => {
   try {
      const response = await fetch(`${url}/api/documents/getAllDocuments`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      const json = await response.json();

      return json.documents;
   } catch (error) {
      console.log("Error in getAllDocuments API", error.message);
   }
};

export const fetchDocument = async (data) => {
   try {
      const response = await fetch(`${url}/api/documents/fetchDocument`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      const json = await response.json();

      return json.document;
   } catch (error) {
      console.log("Error in fetchDocument API", error.message);
   }
};

export const updateDocument = async (data) => {
   try {
      const response = await fetch(`${url}/api/documents/updateDocument`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      const json = await response.json();

      return json.document;
   } catch (error) {
      console.log("Error in updateDocument API", error.message);
   }
};

export const deleteDocument = async (data) => {
   try {
      const response = await fetch(`${url}/api/documents/deleteDocument`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      const json = await response.json();

      console.log(json);
   } catch (error) {
      console.log("Error in deleteDocument API", error.message);
   }
};
