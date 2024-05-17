import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { AccessToken } from "@okta/okta-auth-js";

const style = {
  page: { margin: "10px", fontFamily: "Arial, sans-serif" },

  button: {
    backgroundColor: "#FF0303",
    color: "white",
    padding: "10px",
    border: 0,
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  changePasswordButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    border: 0,
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  table: { marginLeft: "40px", marginTop: "20px", borderCollapse: "collapse" },
  td: { border: "1px solid #ddd", padding: "8px", verticalAlign: "top", textAlign: "left", fontStyle: "bold" },
  tdError: {
    color: "red", border: "1px solid #ddd", padding: "8px", verticalAlign: "top", textAlign: "left", fontStyle: "bold",
  },
  tdSuccess: {
    color: "green", border: "1px solid #ddd", padding: "8px", verticalAlign: "top", textAlign: "left", fontStyle: "bold",
  },
  th: { padding: "12px 8px", backgroundColor: "#F2F2F2", textAlign: "right", verticalAlign: "top" },
};

const Hello = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChangingPasswordForm, setShowChangingPasswordForm] = useState(false);
  const [changePasswordButtonText, setChangePasswordButtonText] = useState("Submit");
  const [changePasswordErrorMsg, setChangePasswordErrorMsg] = useState(null);
  const [changePasswordSuccessMsg, setChangePasswordSuccessMsg] = useState(null);

  const [changePasswordData, setChangePasswordData] = useState({
    clsElevated: "", oldPassword: "", newPassword1: "", newPassword2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setChangePasswordData((prevInputValues) => ({
      ...prevInputValues, [name]: value,
    }));
  };

  const handleChangePasswordSubmit = async () => {
    console.log("handleChangePasswordSubmit2");
    setChangePasswordErrorMsg(null);
    setChangePasswordButtonText("Submitting...");

    if (changePasswordData.newPassword1 !== changePasswordData.newPassword2) {
      setChangePasswordButtonText("Submit");
      setChangePasswordErrorMsg("Error: New passwords do not match");
      return;
    }

    if (changePasswordData.newPassword1.length < 4) {
      setChangePasswordButtonText("Submit");
      setChangePasswordErrorMsg("Error: New passwords needs to be at least 4 characters long");
      return;
    }

    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    console.log('User',user)
    const url = "https://serviceapi.dev.mysba.ussba.io/sso-change-password";
    const data = {
      userName: user?.email,
      clsElevated: user?.cls_elevated !== undefined ? user?.cls_elevated : false,
      oldPassword: changePasswordData.oldPassword,
      newPassword: changePasswordData.newPassword1,
    };
    console.log("data", data);


    try {
      const response = await axios.post(url, data);
      setChangePasswordButtonText("Submit");

      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setChangePasswordSuccessMsg("Password changed successfully");
    } catch (error) {
      setChangePasswordButtonText("Submit");
      console.error(error);
      setChangePasswordErrorMsg(`Error: Unable to change password, ${error.message}`);
    }

  };

  useEffect(() => {
    async function fetchUser() {
      if (!authState.isAuthenticated) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      if (authState.isAuthenticated) {
        const userInfo = await oktaAuth.getUser();
        console.log("userInfo", userInfo);
        setUser(userInfo);
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [authState]);

  function formatKey(key: string) {
    let newKey = key.toLowerCase().replace(/_/g, " ");
    return newKey.split(" ").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  const logout = async () => {
    oktaAuth.signOut();
  };

  const gotoToCls = async () => {
    //POC - Use Case #4
  };

  const toggleShowChangingPasswordForm = async () => {
    console.log("setShowChangingPasswordForm");
    setShowChangingPasswordForm(!showChangingPasswordForm);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (<div style={style.page}>
    <button style={style.button} onClick={logout}>
      Logout
    </button>
    <button style={style.changePasswordButton} onClick={toggleShowChangingPasswordForm}>
      Change Password
    </button>
    {/*<button style={style.button} onClick={gotoToCls}>*/}
    {/*  Go To CLS*/}
    {/*</button>*/}
    <hr />
    {showChangingPasswordForm ? <div>
      <h1>Change Password</h1>
      <table style={style.table}>
        <tbody>
        {changePasswordErrorMsg && (<tr>
          <td style={style.tdError} colSpan={2}>
            {changePasswordErrorMsg}
          </td>
        </tr>)}
        {changePasswordSuccessMsg && (<tr>
          <td style={style.tdSuccess} colSpan={2}>
            {changePasswordSuccessMsg}
          </td>
        </tr>)}
        <tr>
          <th style={style.th}>Old Password:</th>
          <td style={style.td}>
            <input type="text" name="oldPassword" value={changePasswordData.oldPassword}
                   onChange={handleInputChange} />
          </td>
        </tr>
        <tr>
          <th style={style.th}>New Password:</th>
          <td style={style.td}>
            <input type="text" name="newPassword1" value={changePasswordData.newPassword1}
                   onChange={handleInputChange} />
          </td>
        </tr>
        <tr>
          <th style={style.th}>Retype Password:</th>
          <td style={style.td}>
            <input type="text" name="newPassword2" value={changePasswordData.newPassword2}
                   onChange={handleInputChange} />
          </td>
        </tr>
        <tr>
          <td style={{ ...style.td, textAlign: "center" }} colSpan={2}>
            <button style={style.button} onClick={toggleShowChangingPasswordForm}>
              Cancel
            </button>
            <button style={style.changePasswordButton} onClick={handleChangePasswordSubmit}>
              {changePasswordButtonText}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div> : <>
      <h1>Hello, {user?.given_name}, This is what I have on you...</h1>
      <table style={style.table}>
        <tbody>{Object.entries(user).map(([key, value]) => (<tr key={key}>
          <th style={style.th}>{formatKey(key)} :</th>
          <td style={style.td}>{typeof value === "object" && value !== null ? <table>
            <tbody> {Object.entries(value).map(([innerKey, innerValue]) => (<tr key={innerKey}>
              <th style={style.th}>{formatKey(innerKey)} :</th>
              <td style={style.td}>{innerValue}</td>
            </tr>))} </tbody>
          </table> : value.toString()} </td>
        </tr>))}</tbody>
      </table>
      ;
    </>}
  </div>);


};

export default Hello;
