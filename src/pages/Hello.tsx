import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";


const style = { page: { margin: "10px", fontFamily: "Arial, sans-serif" },
  button: {
    backgroundColor: "#ff0303",
    color: "white",
    padding: "10px 20px",
    border: 0,
    borderRadius: "4px",
    cursor: "pointer",
  },
  table: { marginLeft: "40px", marginTop: "20px", borderCollapse: "collapse"},
  td: { border: "1px solid #ddd", padding: "8px", verticalAlign: "top", textAlign: "left",fontStyle: "bold" },
  th: { padding: "12px 8px",  backgroundColor: "#F2F2F2", textAlign: "right", verticalAlign: "top"},
};

const Hello = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (!authState.isAuthenticated) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      if (authState.isAuthenticated) {
        const userInfo = await oktaAuth.getUser();
        setUser(userInfo);
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [authState]);

  function formatKey(key: string) {
    let newKey = key.toLowerCase().replace(/_/g, " ");
    return newKey.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const logout = async () => {
    oktaAuth.signOut();
    };

    const gotoToCls = async () => {
        oktaAuth.signOut(); //POC - Use Case #4
    };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (<div style={style.page}>
    <button style={style.button} onClick={logout}>
      Logout
      </button>
      <button style={style.button} onClick={gotoToCls}>
          Go To CLS
      </button>
    <hr />
    <h1>Hello, {user?.given_name}, This is what I have on you...</h1>
    <table style={style.table} >
      <tbody>{Object.entries(user).map(([key, value]) => (<tr key={key}>
        <th style={style.th}>{formatKey(key)} : </th>
        <td style={style.td}>{typeof value === "object" && value !== null ? <table>
          <tbody> {Object.entries(value).map(([innerKey, innerValue]) => (<tr key={innerKey}>
            <th style={style.th}>{formatKey(innerKey)} : </th>
            <td style={style.td}>{innerValue}</td>
          </tr>))} </tbody>
        </table> : value.toString()} </td>
      </tr>))}</tbody>
    </table>
  </div>);
};

export default Hello;
