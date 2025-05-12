export const signup = async (dispatch, payload) => {
  try {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
        // Optional: you can add firstname/lastname if your backend supports it
      })
    });
    let data = await response.json();
    
    dispatch ({
      type: "set_user",
      payload: {user: data.user_id}
    })

    

    if (response.ok) {
      console.log("Signup successful:", data);
    } else {
      throw new Error(data.msg || "Signup failed");
    }
  } catch (error) {
    console.error("Signup failed:", error.message);
    throw error; // forward to caller (Signup.jsx)
  }
};
        

export const login = async (dispatch, payload) => {
  try {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
      })
    });

    let data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      dispatch({
        type: "set_user",
        payload: { userId: data.user_id }
      });
    } else {
      console.error("Login error:", data);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// export const private = async (dispatch, payload) => {
//     let response = await fetch("https://playground.4geeks.com/contact/agendas/moyunlimited") 
//         let data = await response.json();

//         if(data.detail) {
//             createAgenda();
//         }
//         else {
//             dispatch({
//             type: "set_agenda",
//             payload: {agenda: data.slug, contacts: data.contacts},
//         });
//         }
        

// }